import { getUrl } from "./helper"

export const generatePaymentIntent = async (payload) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload })
  }
  const response = await fetch(getUrl('api/create-cart'), options)
  return await response.json()
}

export const sendCustomerDetails = async (payload) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload })
  }
  await fetch(getUrl('api/add-cart-customer-details'), options)
}

export const updatePaymentIntent = async (payload, cart_id) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart_id, ...payload })
  }
  const response = await fetch(getUrl('api/update-cart'), options)
  return await response.json()
}

export const applyCoupon = async (coupon_code, cart_id) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coupon_code, cart_id })
  }
  const response = await fetch(getUrl('api/apply-coupon-code'), options)
  return await response.json()
}

export const removeCoupon = async (coupon_code, cart_id) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coupon_code, cart_id })
  }
  const response = await fetch(getUrl('api/remove-coupon-code'), options)
  return await response.json()
}
