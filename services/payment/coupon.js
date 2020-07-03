require('dotenv').config()
const stripe = require('../integrations/stripe')
const airtable = require('../integrations/airtable')

async function applyCode(code, paymentIntentId) {
  const paymentIntent = await stripe.paymentIntent(paymentIntentId)
  const discount = await codeDiscount(code)

  if (!discount) {
    return paymentIntent
  }

  let amount = paymentIntent.amount

  if (paymentIntent.metadata.coupon_code) {
    amount += parseInt(paymentIntent.metadata.coupon_discount)
  }

  return await updatePaymentIntent(
    paymentIntentId,
    amount - discount,
    code,
    discount
  )
}

async function removeCode(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntent(paymentIntentId)

  if (!paymentIntent.metadata.coupon_code) {
    return paymentIntent
  }

  return await updatePaymentIntent(
    paymentIntentId,
    paymentIntent.amount + parseInt(paymentIntent.metadata.coupon_discount),
    null,
    null
  )
}

async function codeDiscount(code) {
  const airtableSelectParams = {
    fields: ['discount'],
    filter: `code = "${code}"`,
    maxRecords: 1,
    pageSize: 1
  }

  const records = await airtable.list(process.env.AIRTABLE_COUPON_VIEW, airtableSelectParams)

  return records.length
    ? parseInt(parseFloat(records[0].get('discount')).toFixed(2) * 100)
    : null
}

async function updatePaymentIntent(paymentIntentId, updateAmount, couponCode, couponDiscount) {
  const params = {
    amount: updateAmount,
    metadata: {
      "coupon_code": couponCode,
      "coupon_discount": couponDiscount
    }
  }

  return await stripe.updatePaymentIntent(paymentIntentId, params)
}

module.exports = {
  applyCode,
  removeCode
}
