import { getUrl } from "./helper"

export const generatePaymentIntent = async (payload) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload })
  }
  const response = await fetch(getUrl('cart'), options)
  return await response.json()
}

export const sendCustomerDetails = async (payload) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload })
  }
  const response = await fetch(getUrl('cart/customer'), options)
  return await response.json()
}

export const updatePaymentIntent = async (payload, cart_id) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart_id, ...payload })
  }
  const response = await fetch(getUrl('cart'), options)
  return await response.json()
}

export const applyCoupon = async (coupon_code, cart_id) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coupon_code, cart_id })
  }
  const response = await fetch(getUrl('coupon-code'), options)
  return await response.json()
}

export const removeCoupon = async (coupon_code, cart_id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coupon_code, cart_id })
  }
  const response = await fetch(getUrl('coupon-code'), options)
  return await response.json()
}

export const sendOrderDetails = async (order_id, coupon_code, total, address) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id,
      details: {
         ...address,
        coupon_code,
        total,
        tip: 0
      }
    })
  }

  return await fetch(getUrl('order-details'), options)
}
