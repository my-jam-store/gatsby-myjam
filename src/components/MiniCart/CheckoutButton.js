import React, { useContext, useState } from "react"
import { navigate } from "gatsby-link"
import { Button, LoaderIcon } from "./Components"
import AppContext from "../../store/context"
import * as Stripe from "../../utils/stripe"
import { showMessage } from "../../utils/notification"
import { setPaymentIntent } from "../../store/actions"
import { formatPayload } from "../../utils/helper"


const CheckoutButton = () => {
  const [ loading, setLoading ] = useState(false)
  const { state, dispatch } = useContext(AppContext)

  const renderBlockEle = () => {
    const blackLayer = document.createElement("div")
    blackLayer.style.width = "100%"
    blackLayer.style.height = "100vh"
    blackLayer.style.zIndex = "9999"
    blackLayer.style.position = "fixed"
    blackLayer.style.top = "0"
    blackLayer.style.left = "0"
    blackLayer.id = "loading-checkout"
    document.querySelector('body').appendChild(blackLayer)
  }

  const handleCheckout = async () => {
    if(state.items.length === 0) {
      return showMessage('Please add items to cart', 'warning')
    }
    setLoading(true)

    const payload = formatPayload(state.items)

    const { amount, id, metadata } = state.paymentIntent ?
        await Stripe.updatePaymentIntent(payload, state.paymentIntent.id)
      : await Stripe.generatePaymentIntent(payload)

    const { shipping_amount, coupon_code = '', coupon_discount = 0 } = metadata
    dispatch(setPaymentIntent(
      id,
      Number(amount/100),
      Number(shipping_amount/100).toFixed(2),
      coupon_code,
      coupon_discount
    ))

    navigate('/checkout')
  }

  return (
    <>
      <Button onClick={handleCheckout} disabled={loading}>
        {loading ? (
          <>
            <span>loading</span> <LoaderIcon />
          </>
        ):(
          <span>checkout</span>
        )}
      </Button>
      {loading && renderBlockEle()}
    </>
  )
}

export default CheckoutButton
