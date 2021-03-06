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
import { ArrowDown } from "../NavItemsMobile/Components"

const Summary = () => {
  const { state, dispatch } = useContext(AppContext)
  const [showMore, setShowMore] = useState(false)
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
    document.querySelector('html').removeAttribute('style')
    document.querySelector('body').removeAttribute('style')
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
      <ItemsGrid className={showMore ? 'show-more' : 'show-less'}>
        {state.items.map((item) => (
          <Item key={item.id}>
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
      <span onClick={() => {setShowMore(!showMore)}}>
        {showMore ? 'See Less' : 'See More'}
        <ArrowDown className={showMore && 'rotate'} />
      </span>
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
          <button onClick={handleCoupon}>{isApplied ? 'Remove' : 'Apply'}</button>
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
