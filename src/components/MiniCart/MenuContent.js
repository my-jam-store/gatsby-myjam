import React, { useContext } from "react"
import AppContext from "../../store/context"
import MenuItems from "./MenuItems"
import { Button, BtnBlock, SubTotalBlock } from "./Components"
import Checkout from "./Checkout"

const MenuContent = () => {
  const { state } = useContext(AppContext)

  const renderCartAmountBlock = () => {
    const amount = state.items.reduce((total, item) => {
      return total + (item.qty * Number(item.price) * 100)
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
        <Checkout />
      </BtnBlock>
    </div>
  )
}

export default MenuContent