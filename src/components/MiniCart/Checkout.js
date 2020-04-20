import React, { useContext, useEffect, useState } from "react"
import { Button } from "./Components"
import AppContext from "../../store/context"
import * as Stripe from "../../utils/stripe"
import { showMessage } from "../../utils/notification"


const Checkout = () => {
  const [ stripe, setStripe ] = useState('')
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    Stripe.getStripeInstance().then((stripeInstance) => setStripe(stripeInstance))
  }, [])

  const handleCheckout = async () => {
    // TODO maintain sessionId in globalStore
    if(state.items.length === 0) {
      return showMessage('Please add items to cart', 'warning')
    }

    const { sessionId } = await Stripe.generateCheckoutSession(state.items)
    const { error } = await Stripe.goToCheckout(stripe, sessionId)
    if(error) {
      // TODO handle error
    }
  }

  return (
    // TODO add loader
    <Button onClick={handleCheckout}>Checkout</Button>
  )
}

export default Checkout