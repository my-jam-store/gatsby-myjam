const shipping = require('./shipping')
const crypto = require('../crypto')

async function processedLineItems(lineItems) {
  const processedItems = []
  let processedItem
  let subtotal = 0

  for (const lineItem in lineItems) {
    processedItem = lineItems[lineItem]
    processedItem.price_data.currency = process.env.CURRENCY

    processedItem.price_data.unit_amount = await lineItemAmount(
      processedItem.price_data.unit_amount,
      processedItem.product_id
    )

    subtotal += processedItem.price_data.unit_amount
    processedItem.price_data.unit_amount *= 100

    delete processedItem.product_id

    processedItems.push(processedItem)
  }

  processedItems.push(shippingLineItem(subtotal))

  return processedItems
}

async function lineItemAmount(amount, productId = null) {
  switch (process.env.AMOUNT_MANIPULATION_PROTECTION_TYPE) {
    case 'encryption':
      if (!Number(amount)) {
        amount = await encryptedLineItemAmount(amount, productId)
      }

      break
  }

  return amount
}

async function encryptedLineItemAmount(amount, productId) {
  amount = JSON.parse(await crypto.decrypt(amount))

  if (amount['product_id'] !== productId) {
    throw new Error(`Item "${productId}" amount is invalid.`)
  }

  return amount['amount']
}

function shippingLineItem(subtotal) {
  return {
    price_data: {
      currency: process.env.CURRENCY,
      product_data: {
        name: shipping.product.name,
        metadata: { type: shipping.product.type }
      },
      unit_amount: shipping.amount(subtotal)
    },
    quantity: 1
  }
}

module.exports = {
  processedLineItems
}
