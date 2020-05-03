import React, { useContext, useEffect, useState } from "react"
import {
  Content,
  EmptyContent,
  Title,
  Container,
  Wrapper,
  TextHeader,
  Track,
  Label,
  EnableTip,
  TipInput } from "./Components"
import Item from "./Item"
import AppContext from "../../store/context"
import Checkout from "./Checkout"
import { addTipAmount } from "../../store/actions"

const CartContent = () => {
  const { state, dispatch } = useContext(AppContext)
  const [ tipState, setTipState ] = useState(false)
  const [tipValue, setTip ] = useState('')

  const renderCartAmountBlock = () => {
    const amount = state.items.reduce((total, item) => {
      return total + (item.quantity * Number(item.price) * 100)
    }, 0)

    return (
      <Wrapper>
        <Track>
          <TextHeader>Subtotal</TextHeader>
        </Track>
        <Track></Track>
        <Track></Track>
        <Track>
          <TextHeader>&#163;{Number(amount/100).toFixed(2)}</TextHeader>
        </Track>
      </Wrapper>
    )
  }

  const renderCartItemsBlock = () => (
    <>
      {state.items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </>
  )

  const renderEmptyCart = () => (
    <EmptyContent>
      <h2>The cart is now empty. Select some products to buy before checking out.</h2>
    </EmptyContent>
  )

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

  const renderCartContent = () => (
    <Content>
      <Title>Cart Summary</Title>
      <Container>
        <Wrapper>
          <TextHeader>Name</TextHeader>
          <TextHeader>Qty</TextHeader>
          <TextHeader>Price</TextHeader>
          <TextHeader>Total Price</TextHeader>
        </Wrapper>
        {renderCartItemsBlock()}
        {renderCartAmountBlock()}
        <Wrapper>
          <Track>
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
          </Track>
          <Track></Track>
          <Track></Track>
          <Track>
            <Checkout />
          </Track>
        </Wrapper>
      </Container>
    </Content>
  )

  return state.items.length > 0 ? renderCartContent() : renderEmptyCart()
}

export default CartContent
