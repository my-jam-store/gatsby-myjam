import React, { useState, useContext } from "react"
import { CartIcon } from "./Components"
import AppContext from "../../store/context"
import MiniCartModal from "./MiniCartModal"

const MiniCart = () => {
  const { state } = useContext(AppContext)
  const [showModal, setModalState] = useState(false)

  const renderCartQuantity = () => {
    if(!!state && !!state.items) {
      const qty = state.items.reduce((totalQty, item) => {
        return totalQty + item.qty
      }, 0)
      return qty > 0 ? (<span className="snipcart-total-items">{qty}</span>) : (<></>)
    } else {
      return (<></>)
    }
  }

  const showMiniCart = () => {
    // TODO handle miniCart menu on mobile.
    setModalState(true)
  }

  return (
    <>
      <div onClick={showMiniCart}>
        <CartIcon />
        {renderCartQuantity()}
      </div>
      <MiniCartModal
        isOpen={showModal}
        handleClose={() => {setModalState(false)}}
      />
    </>
  )
}

export default MiniCart