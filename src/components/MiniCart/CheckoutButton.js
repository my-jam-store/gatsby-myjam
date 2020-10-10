import React, { useContext, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { navigate } from "gatsby-link"
import { Button, LoaderIcon } from "./Components"
import AppContext from "../../store/context"
import * as Stripe from "../../utils/stripe"
import { showMessage } from "../../utils/notification"
import { setPaymentIntent } from "../../store/actions"
import { formatPayload } from "../../utils/helper"

const CheckoutButton = () => {
  const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
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

    const stripeInstance = await stripePromise
    const payload = formatPayload(state.items)

    const { sessionId } = await Stripe.generatePaymentSession(payload)

    stripeInstance.redirectToCheckout({ sessionId })
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
