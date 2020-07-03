const tip = require('../services/payment/tip')

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  try {
    const paymentIntent = await tip.setAmount(body.amount, body.cart_id)
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
