const cart = require('../services/payment/cart')

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  try {
    await cart.addCustomerDetails(body.cart_id, body.customer_details)

    return {
      statusCode: 200,
      body: '',
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({error : err.message}),
    }
  }
}
