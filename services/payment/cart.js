require('dotenv').config()
const stripe = require('../integrations/stripe')
const airtable = require('../integrations/airtable')
const order = require('./order')
const shipping = require('./shipping')

async function create(total, lineItems, lineItemsMetadata) {
  const paymentIntent = await stripe.createPaymentIntent({
    amount: totalInteger(total) + shipping.amount(),
    metadata: {
      "shipping_amount": shipping.amount(),
      "line_items": lineItemsMetadata
    }
  })

  addItems(paymentIntent.id, lineItems)

  return paymentIntent
}

async function update(paymentIntentId, total, lineItems, lineItemsMetadata) {
  const paymentIntent = await stripe.paymentIntent(paymentIntentId)
  total = totalInteger(total) + shipping.amount()

  if (paymentIntent.metadata.tip_amount) {
    total += parseInt(paymentIntent.metadata.tip_amount)
  }

  if (paymentIntent.metadata.coupon_code) {
    total -= parseInt(paymentIntent.metadata.coupon_discount)
  }

  const paymentIntentParams = {
    amount: total,
    metadata: {
      "line_items": lineItemsMetadata
    }
  }

  const updatedPaymentIntent = await stripe.updatePaymentIntent(
    paymentIntentId,
    paymentIntentParams
  )

  updateItems(paymentIntent.id, lineItems)

  return updatedPaymentIntent
}

async function addCustomerDetails(paymentIntentId, customerDetails) {
  await stripe.updatePaymentIntent(
    paymentIntentId,
    { metadata: { "customer_details": JSON.stringify(customerDetails) } }
  )

  saveCustomerDetailsRecord(paymentIntentId, customerDetails)
}

async function createOrder(paymentIntent) {
  const chargesData = paymentIntent.charges.data[0]
  const billing = paymentIntent.shipping || chargesData.billing_details
  const tip = paymentIntent.metadata.tip_amount
    ? parseFloat((paymentIntent.metadata.tip_amount / 100).toFixed(2))
    : null

  const data = {
    "payment_intent_id": paymentIntent.id,
    "customer_name": billing.name,
    "email": chargesData.billing_details.email,
    "tip": tip,
    "coupon_code": paymentIntent.metadata.coupon_code,
    "total": parseFloat((paymentIntent.amount / 100).toFixed(2)),
    "date": new Date(chargesData.created * 1000).toISOString(),
    "address": [billing.address.line1, billing.address.line2].filter(Boolean).join(' - '),
    "post_code": billing.address.postal_code,
    "city": billing.address.city,
    "phone_number": billing.phone
  }

  const cartItems = await items(paymentIntent.id)
  const lineItems = []

  console.log(`[ORDER_LINE_ITEMS] - [PAYMENT_INTENT_ID: ${paymentIntent.id}]`)
  console.log(cartItems)

  cartItems.forEach(item => {
    delete item.fields['item_id']
    delete item.fields['payment_intent_id']
    delete item.fields['created_at']
    delete item.fields['updated_at']

    lineItems.push({ fields: item.fields })
  })

  order.createOrder(data, lineItems)
}

function addItems(paymentIntentId, items) {
  items.forEach((item, index) => {
    items[index]['fields']['payment_intent_id'] = paymentIntentId
  })

  airtable.createRecord(process.env.AIRTABLE_CART_ITEMS_VIEW, items)
}

async function items(paymentIntentId) {
  return await airtable.list(
    process.env.AIRTABLE_CART_ITEMS_VIEW,
    { filter: `payment_intent_id = "${paymentIntentId}"` }
  )
}

async function updateItems(paymentIntentId, items) {
  try {
    await deleteItems(paymentIntentId)
  } catch (err) {
    return
  }

  addItems(paymentIntentId, items)
}

async function deleteItems(paymentIntentId) {
  const itemIds = await itemRecordIds(paymentIntentId)
  await airtable.deleteRecords(process.env.AIRTABLE_CART_ITEMS_VIEW, itemIds)
}

async function itemRecordIds(paymentIntentId) {
  const recordIds = []
  const selectParams = {
    fields: ['item_id'],
    filter: `payment_intent_id = "${paymentIntentId}"`
  }

  const records = await airtable.list(process.env.AIRTABLE_CART_ITEMS_VIEW, selectParams)

  records.forEach(record => {
    recordIds.push(record.id)
  })

  return recordIds.length === 1 ? recordIds[0] : recordIds
}

async function saveCustomerDetailsRecord(paymentIntentId, customerDetails) {
  const customerId = await customerRecordId(paymentIntentId)
  customerDetails['payment_intent_id'] = paymentIntentId

  return customerId
    ? airtable.updateRecord(process.env.AIRTABLE_CART_CUSTOMERS_VIEW, customerId, customerDetails)
    : airtable.createRecord(process.env.AIRTABLE_CART_CUSTOMERS_VIEW, customerDetails)
}

async function customerRecordId(paymentIntentId) {
  let recordId = null
  const selectParams = {
    fields: ['customer_id'],
    filter: `payment_intent_id = "${paymentIntentId}"`,
    maxRecords: 1,
    pageSize: 1
  }

  const records = await airtable.list(process.env.AIRTABLE_CART_CUSTOMERS_VIEW, selectParams)
  records.forEach(record => { recordId = record.id })

  return recordId
}

function totalInteger(total) {
  return parseInt(parseFloat(total).toFixed(2) * 100)
}

module.exports = {
  create,
  update,
  addCustomerDetails,
  createOrder
}
