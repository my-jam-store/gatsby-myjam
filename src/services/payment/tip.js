require('dotenv').config()
const stripe = require('../integrations/stripe')

async function setAmount(tipAmount, paymentIntentId) {
  const paymentIntent = await stripe.paymentIntent(paymentIntentId)

  if (!paymentIntent.metadata.tip_amount && !tipAmount) {
    return paymentIntent
  }

  if (!tipAmount && tipAmount !== 0) {
    tipAmount = 0
  }

  let updatedAmount = paymentIntent.amount
  tipAmount = parseInt(parseFloat(tipAmount).toFixed(2) * 100)

  if (paymentIntent.metadata.tip_amount) {
    updatedAmount -= parseInt(paymentIntent.metadata.tip_amount)
  }

  const paymentIntentParams = {
    amount: updatedAmount + tipAmount,
    metadata: { "tip_amount": tipAmount || null }
  }

  return await stripe.updatePaymentIntent(paymentIntentId, paymentIntentParams)
}

module.exports = {
  setAmount
}
