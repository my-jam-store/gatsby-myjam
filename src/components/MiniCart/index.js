import React, { useState, useEffect, useContext } from "react"
import { CartIcon } from "./Components"
import AppContext from "../../store/context"
import Modal from "react-modal"
import MiniCartModal from "./MiniCartModal"

const MiniCart = () => {
  const { state, dispatch } = useContext(AppContext)
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

  const showMiniCart = () => setModalState(true)

  const handleCloseModal = () => setModalState(false)

  return (
    <>
      <div onClick={showMiniCart}>
        <CartIcon />
        {renderCartQuantity()}
      </div>
      <MiniCartModal
        isOpen={showModal}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default MiniCart