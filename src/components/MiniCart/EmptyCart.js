import React, { useContext, useEffect } from "react"
import AppContext from "../../store/context"
import { clearCart } from "../../store/actions"
import { navigate } from "gatsby"

const EmptyCart = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if(state.paymentIntent) {
        dispatch(clearCart())
      } else {
        navigate("/404")
      }
    }
  }, [])

  return (
    <></>
  )
}

export default EmptyCart
