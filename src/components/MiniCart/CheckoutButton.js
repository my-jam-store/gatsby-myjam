import React, { useContext, useEffect, useState } from "react"
import { Button, LoaderIcon } from "./Components"
import AppContext from "../../store/context"
import * as Stripe from "../../utils/stripe"
import { showMessage } from "../../utils/notification"
import { setSessionId } from "../../store/actions"


const Checkout = () => {
  const [ stripe, setStripe ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    Stripe.getStripeInstance().then((stripeInstance) => setStripe(stripeInstance))
  }, [])

  const renderBlockEle = () => {
    const blackLayer = document.createElement("div")
    blackLayer.style.width = "100%"
    blackLayer.style.height = "100vh"
    blackLayer.style.zIndex = "9999"
    blackLayer.style.position = "fixed"
    blackLayer.style.top = "0"
    blackLayer.style.left = "0"
    document.querySelector('body').appendChild(blackLayer)
  }

  const handleCheckout = async () => {
    if(state.items.length === 0) {
      return showMessage('Please add items to cart', 'warning')
    }

    setLoading(true)
    const { sessionId } = await Stripe.generateCheckoutSession({
      line_items: state.items,
      tip: state.tipAmount
    })

    dispatch(setSessionId(sessionId))
    const { error } = await Stripe.goToCheckout(stripe, sessionId)
    if(error) {
      showMessage(error.message, 'danger')
    }
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

export default Checkout
