import React from "react"
import { CartIcon } from "./Components"
import "react-notifications-component/dist/theme.css"

const MiniCart = () => {
  return (
    <div>
      <a href="#" className="snipcart-checkout">
        <CartIcon />
      </a>
    </div>
  )
}

export default MiniCart