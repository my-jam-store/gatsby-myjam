import React, { useContext, useEffect, useState } from "react"
import {
  Content,
  EmptyContent,
  Title,
  Container,
  Wrapper,
  TextHeader,
  Track
} from "./Components"
import Item from "./Item"
import AppContext from "../../store/context"
import CheckoutButton from "./CheckoutButton"

const CartContent = () => {
  const { state } = useContext(AppContext)

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
      {state.items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </>
  )

  const renderEmptyCart = () => (
    <EmptyContent>
      <h2>The cart is now empty. Select some products to buy before checking out.</h2>
    </EmptyContent>
  )


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
          <Track></Track>
          <Track></Track>
          <Track></Track>
          <Track>
            <CheckoutButton />
          </Track>
        </Wrapper>
      </Container>
    </Content>
  )

  return state.items.length > 0 ? renderCartContent() : renderEmptyCart()
}

export default CartContent
