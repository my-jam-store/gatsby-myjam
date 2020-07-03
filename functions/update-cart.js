const cart = require('../services/payment/cart')

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  try {
    console.log(`[PAYMENT_INTENT_ID]: ${body.cart_id}`)
    console.log('[CART_UPDATE_LINE_ITEMS]')
    console.log(body.line_items)

    const paymentIntent = await cart.update(
      body.cart_id,
      body.amount,
      body.line_items,
      body.line_items_metadata
    )

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
