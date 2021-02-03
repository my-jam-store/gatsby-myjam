const airtable = require('./integrations/airtable')
const checkoutSession = require('./checkout/session')
const shipping = require('./checkout/shipping')
const Order = require('../models/order')
const OrderItem = require('../models/order/item')

async function create(checkoutSessionId) {
  if (process.env.ORDER_CREATE_ENABLED !== 'true') {
    return
  }

  const checkout = await checkoutSession.get(checkoutSessionId)

  const promotionCodePromise = checkout.promotionCode()
  const items = lineItems(checkout.line_items.data)
  const promotionCode = await promotionCodePromise

  const orderData = new Order(checkout, promotionCode).data
  const completedOrder = await airtable.createRecord(process.env.AIRTABLE_ORDER_VIEW, orderData)

  await addItems(items, completedOrder.id)
}

function lineItems(items) {
  const lineItems = []

  items.forEach(item => {
    if (!shipping.isShippingProduct(item.price.product.metadata.type)) {
      lineItems.push({ fields: new OrderItem(item).data })
    }
  })

  return lineItems
}

async function addItems(items, orderId) {
  items.forEach(item => { item.fields['order_id'] = [ orderId ] })
  await airtable.createRecord(process.env.AIRTABLE_ORDER_ITEMS_VIEW, items)
}

module.exports = {
  create
}
