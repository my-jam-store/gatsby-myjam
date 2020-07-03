const cart = require('../services/payment/cart')

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  try {
    console.log('[CART_CREATE_LINE_ITEMS]')
    console.log(body.line_items)

    const paymentIntent = await cart.create(
      body.amount,
      body.line_items,
      body.line_items_metadata
    )
    console.log(`[PAYMENT_INTENT_ID]: ${paymentIntent.id}`)

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({error : err.message}),
    }
  }
}
