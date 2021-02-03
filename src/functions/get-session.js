const checkoutSession = require('./stripe-checkout/services/checkout/session')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { session_id } = event.query
    const session = await checkoutSession.get(session_id)

    return { statusCode: 200, body: JSON.stringify({ 'session': session }) }
  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      body: 'An error has occurred. Please contact the website administrator.'
    }
  }
}
