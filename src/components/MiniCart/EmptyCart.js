import React, { useContext, useEffect } from "react"
import AppContext from "../../store/context"
import { clearCart } from "../../store/actions"

const EmptyCart = () => {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    dispatch(clearCart())
  }, [])

  return (
    <></>
  )
}

export default EmptyCart
