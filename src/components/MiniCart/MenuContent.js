import React, { useContext, useEffect, useState } from "react"
import AppContext from "../../store/context"
import MenuItems from "./MenuItems"
import { TipBlock, BtnBlock, SubTotalBlock, EnableTip, Label, TipInput } from "./Components"
import CheckoutButton from "./CheckoutButton"
import { addTipAmount } from "../../store/actions"

const MenuContent = () => {
  const { state, dispatch } = useContext(AppContext)
  const [ tipState, setTipState ] = useState(false)
  const [tipValue, setTip ] = useState('')

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

  const handleTip = (e) => {
    setTipState(e.target.checked)
  }

  const setTipAmount = (e) => {
    const value = e.target.value
    if((/^[0-9]*$/.test(value) && Number(value) > 0) || value.length === 0) {
      setTip(value)
    }
  }

  useEffect(() => {
    if(tipState) {
      document.getElementById('tipAmount').focus()
    } else {
      setTip('')
    }
  }, [tipState])

  useEffect(() => {
    const tip = Number(tipValue)
    dispatch(addTipAmount(!!tip ? tip : 0))
  }, [tipValue])

  return (
    <div>
      {state.items.map((item) => (
        <MenuItems key={item.id} item={item} />
      ))}
      {renderCartAmountBlock()}
      <TipBlock>
        <EnableTip
          type="checkbox"
          id="tip"
          name="tip"
          onChange={handleTip}
          checked={tipState}
        />
        <Label htmlFor="tip">Add tip for driver</Label>
        {tipState && <span>&#163;</span>}
        <TipInput
          value={tipValue}
          onChange={setTipAmount}
          disabled={!tipState}
          type="text"
          id="tipAmount"
          name="tipAmount"
        />
      </TipBlock>
      <BtnBlock>
        <CheckoutButton />
      </BtnBlock>
    </div>
  )
}

export default MenuContent
