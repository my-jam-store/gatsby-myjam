import React, { useState, useContext, useEffect } from "react"
import { CartIcon } from "./Components"
import AppContext from "../../store/context"
import MiniCartModal from "./MiniCartModal"
import { Container } from "../NavItemsMobile/Components"
import Menu from "./Menu"

const MiniCart = () => {
  const { state } = useContext(AppContext)
  const [ isOpen, setMenuStatus ] = useState(false)

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

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

  return (
    <>
      <Container>
        <CartIcon onClick={() => {setMenuStatus(true)}} />
        {renderCartQuantity()}
      </Container>
      { isMobile() ?
        (
          <Menu
            isOpen={isOpen}
            handleClose={() => {setMenuStatus(false)}}
          />
        ) : (
        <MiniCartModal
          isOpen={isOpen}
          handleClose={() => {setMenuStatus(false)}}
        />
      )}
    </>
  )
}

export default MiniCart