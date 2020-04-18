import React, { useContext } from "react"
import { Content, Title, Container, Wrapper, TextHeader, Track, Button } from "./Components"
import Item from "./Item"
import AppContext from "../../store/context"

const CartContent = () => {
  const { state } = useContext(AppContext)

  const renderCartAmountBlock = () => {
    const amount = state.items.reduce((total, item) => {
      return total + (item.qty * Number(item.price) * 100)
    }, 0)

    return (
      <Wrapper>
        <Track>
          <TextHeader>Subtotal</TextHeader>
        </Track>
        <Track></Track>
        <Track></Track>
        <Track>
          <TextHeader>&#163;{amount/100}</TextHeader>
        </Track>
      </Wrapper>
    )
  }

  const renderCardItemsBlock = () => (
    <>
      {state.items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </>
  )

  return (
    <Content>
      <Title>Cart Summary</Title>
      <Container>
        <Wrapper>
          <TextHeader>Name</TextHeader>
          <TextHeader>Qty</TextHeader>
          <TextHeader>Price</TextHeader>
          <TextHeader>Total Price</TextHeader>
        </Wrapper>
        {renderCardItemsBlock()}
        {renderCartAmountBlock()}
        <Wrapper>
          <Track></Track>
          <Track></Track>
          <Track></Track>
          <Track>
            <Button>Checkout</Button>
          </Track>
        </Wrapper>
      </Container>
    </Content>
  )
}

export default CartContent