import { loadStripe } from '@stripe/stripe-js';

export const getStripeInstance = async () => {
  const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY, {
    stripeAccount: process.env.GATSBY_STRIPE_CONNECT_ID
  })
  return stripe
}

export const generateCheckoutSession = async (data) => {
  const url = process.env.GATSBY_CREATE_CHECKOUT_SESSION_API
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data })
  }

  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

export const goToCheckout = async (stripe, sessionId) => {
  const { error } = await stripe.redirectToCheckout({ sessionId })
  return error
}
