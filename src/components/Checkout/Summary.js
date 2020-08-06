import React, { useContext, useEffect, useState } from "react"
import { navigate } from "gatsby-link"
import * as Stripe from "../../utils/stripe"
import AppContext from "../../store/context"
import {
  SummaryBlock,
  ItemsGrid,
  Item,
  Discount,
  Block,
  TotalBlock
} from "./Components"
import { setPaymentIntent } from "../../store/actions"
import { LoaderIcon } from "../MiniCart/Components"

const Summary = () => {
  const { state, dispatch } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [isApplied, setDiscount] = useState(false)
  const [error, setError] = useState(null)
  const [couponCode, setCouponCode] = useState(state.paymentIntent.coupon || '')

  const getItemTotal = (qty, price) => {
    const amount = qty * (Number(price)*100);
    return (amount/100).toFixed(2);
  }

  const getSubTotal = () => {
    const amount = state.items.reduce((total, item) => {
      return total + (item.quantity * Number(item.price) * 100)
    }, 0)

    return Number(amount/100).toFixed(2)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setCouponCode(value)
  }

  const freeShippingApplied = () =>
    Number.parseInt(state.paymentIntent.shipping) === 0

  const handleCoupon = async () => {
    setLoading(true)

    if(isApplied) {
      const { amount, id, metadata, client_secret, } = await Stripe.removeCoupon(couponCode, state.paymentIntent.id)
      const { shipping_amount, coupon_code = '', coupon_discount = 0 } = metadata

      if(Number(coupon_discount) === 0) {
        dispatch(setPaymentIntent(
          id,
          client_secret,
          amount,
          shipping_amount,
          '',
          0
        ))
        setDiscount(false)
        setCouponCode('')
      }
    } else {
      const { amount, id, metadata, client_secret } = await Stripe.applyCoupon(couponCode, state.paymentIntent.id)
      const { shipping_amount, coupon_code = '', coupon_discount = 0 } = metadata

      if(Number(coupon_discount) > 0) {
        dispatch(setPaymentIntent(
          id,
          client_secret,
          amount,
          shipping_amount,
          coupon_code,
          coupon_discount
        ))
        setDiscount(true)
        setError(null)
      } else {
        setError("invalid coupon code")
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    const loading = document && document.getElementById("loading-checkout")
    if(loading) {
      loading.remove()
    }
    if(state.paymentIntent && !state.paymentIntent.id) {
      navigate("/404")
    }

    if(Number(state.paymentIntent.discount) > 0) {
      setDiscount(true)
    }
  }, [])

  return (
    <SummaryBlock>
      <h3>Order Summary</h3>
      <ItemsGrid>
        {state.items.map((item) => (
          <Item key={item.id}>
            <img
              src={item.image}
              alt={item.name}
            />
            <span>{item.name}</span>
            <span className="price">
              <span className="total-price">
                &#163;{getItemTotal(item.quantity, item.price)}
              </span>
              <br/>
              {item.quantity} x &#163;{item.price}
            </span>
          </Item>
        ))}
      </ItemsGrid>
      <Block>
        <div>
          <span>Subtotal</span>
          <span>&#163;{getSubTotal()}</span>
        </div>
        <div>
          <span>Shipping Fee</span>
          <span>&#163;{state.paymentIntent.shipping}</span>
        </div>
        {isApplied && (
          <div>
            <span>Discount Amount</span>
            <span>- &#163;{state.paymentIntent.discount}</span>
          </div>
        )}
      </Block>
      <Discount error={error}>
        <input
          readOnly={isApplied || freeShippingApplied()}
          type="text"
          placeholder="add coupon code here"
          onChange={handleChange}
          value={couponCode}
        />
        {loading ? (
          <button disabled={true}>
            <span>Loading</span> <LoaderIcon />
          </button>
        ):(
          <button
            disabled={freeShippingApplied()}
            onClick={handleCoupon}
          >
            {isApplied ? 'Remove' : 'Apply'}
          </button>
        )}
        {error && <p>{error}</p>}
      </Discount>
      <TotalBlock>
        <span>Total</span>
        <span>&#163;{state.paymentIntent.amount}</span>
      </TotalBlock>
    </SummaryBlock>
  )
}

export default Summary
