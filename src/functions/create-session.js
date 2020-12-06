const checkoutSession = require('./stripe-checkout/services/checkout/session')

exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' }
  }

  try {
    const data = JSON.parse(event.body)
    const session = await checkoutSession.create(data.line_items, data.metadata)

    return { statusCode: 200, body: JSON.stringify({ sessionId: session.id }) }
  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      body: 'An error has occurred. Please contact the website administrator.'
    }
  }
}
