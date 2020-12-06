const stripe = require('./stripe-checkout/services/integrations/stripe')
const order = require('./stripe-checkout/services/order')
const HttpError = require('./stripe-checkout/services/error/http')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const checkoutSession = stripe.completedCheckoutSession(event.body, event.headers)
    await order.create(checkoutSession.id)

    return { statusCode: 200, body: 'Successful event' }
  } catch (err) {
    if (err instanceof HttpError) {
      return { statusCode: err.code, body: err.message }
    }

    console.error(err)
    return { statusCode: 500, body: err.message }
  }
}

