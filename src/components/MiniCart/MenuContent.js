import React, { useContext, useEffect, useState } from "react"
import AppContext from "../../store/context"
import MenuItems from "./MenuItems"
import { TipBlock, BtnBlock, SubTotalBlock, EnableTip, Label, TipInput } from "./Components"
import CheckoutButton from "./CheckoutButton"

const MenuContent = () => {
  const { state, dispatch } = useContext(AppContext)

  const renderCartAmountBlock = () => {
    const amount = state.items.reduce((total, item) => {
      return total + (item.quantity * Number(item.price) * 100)
    }, 0)

    return (
      <SubTotalBlock>
        <h4>Subtotal <span>&#163;{Number(amount/100).toFixed(2)}</span></h4>
      </SubTotalBlock>
    )
  }

  return (
    <div>
      {state.items.map((item) => (
        <MenuItems key={item.id} item={item} />
      ))}
      {renderCartAmountBlock()}
      <BtnBlock>
        <CheckoutButton />
      </BtnBlock>
    </div>
  )
}

export default MenuContent
