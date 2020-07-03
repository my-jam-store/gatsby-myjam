const stripe = require('../services/integrations/stripe')
const cart = require('../services/payment/cart')

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  let paymentIntent
  try {
    paymentIntent = stripe.webhookEventPaymentIntent(body, headers)

    if (!stripe.isPaymentIntentRequiresCapture(paymentIntent)) {
        return {
          statusCode: 403,
          body: '',
        }
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 400,
      body: 'Webhook signature verification failed.',
    }
  }

  try {
    await cart.createOrder(paymentIntent)
    return {
      statusCode: 200,
      body: '',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({error : err.message}),
    }
  }
}
