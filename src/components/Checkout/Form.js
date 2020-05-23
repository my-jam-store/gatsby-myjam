import React, { useContext, useState } from "react"
import { navigate } from "gatsby-link"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { FormWrapper } from "./Components"
import AppContext from "../../store/context"
import { LoaderIcon } from "../MiniCart/Components"
import { sendOrderDetails } from "../../utils/stripe"
import { getTodayDate } from "../../utils/helper"

const Form = () => {
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#eb1c26",
        iconColor: "#eb1c26",
      },
    },
  };

  const { state } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [error, setError] = useState({})
  const [cardError, setCardError] = useState({ err: false, message: ''})

  const stripe = useStripe()
  const elements = useElements()

  const handleChange = (e) => {
    const key = e.target.id
    const value = e.target.value
    switch (key) {
      case "name":
        setName(value)
        break
      case "email":
        setEmail(value)
        break
      case "mobile":
        setMobile(value)
        break
      case "address":
        setAddress(value)
        break
      case "city":
        setCity(value)
        break
      case "postcode":
        setPostcode(value)
        break
      default:
        return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError({})
    setLoading(true)
    if (!stripe || !elements) {
      return;
    }

    const valid = validateData()

    if(valid) {
      const result = await stripe.confirmCardPayment(state.paymentIntent.clientSecret, {
        payment_method: {
          billing_details: {
            address: {
              city: city,
              country: 'GB',
              line1: address,
              postal_code: postcode,
              state: null
            },
            email: email,
            name: name,
            phone: mobile
          },
          card: elements.getElement(CardElement),
        }
      });
      if(!!result.error) {
        setLoading(false)
        setCardError({
          error: true,
          message: result.error.message
        })
        return;
      }
      if(result.paymentIntent.status === 'requires_capture') {
        const res = await sendOrderDetails(
          state.paymentIntent.id,
          state.paymentIntent.coupon,
          state.paymentIntent.amount,
          {
            customer_name: name,
            email: email,
            address: address,
            post_code: postcode,
            phone_number: mobile,
            date: getTodayDate()
          }
        )
        setLoading(false)
        navigate('/success')
      }
    } else {
      setLoading(false)
    }
  }

  const validateData = () => {
    let valid = true;
    if(name.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        name: 'name is required'
      }))
      valid = false;
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError((preState) => ({
        ...preState,
        email: 'email is invalid'
      }))
      valid = false;
    }

    if(/^[a-zA-Z]+$/.test(mobile)) {
      setError((preState) => ({
        ...preState,
        mobile: 'mobile number is invalid'
      }))
      valid = false;
    }

    if(mobile.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        mobile: 'mobile number is required'
      }))
      valid = false;
    }

    if(city.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        city: 'city is required'
      }))
      valid = false;
    }

    if(address.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        address: 'address is required'
      }))
      valid = false;
    }

    if(postcode.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        postcode: 'postcode is required'
      }))
      valid = false;
    }

    return valid;
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <p>Complete your shipping and payment details below</p>
      <section>
        <h4>Shipping & Billing Information</h4>
        <fieldset>
          <label className={error.name && 'error'}>
            <span>Name</span>
            <input onChange={handleChange} value={name} type="text" placeholder="Full Name" id="name" />
            {error.name && <p>{error.name}</p>}
          </label>
          <label className={error.email && 'error'}>
            <span>Email</span>
            <input onChange={handleChange} value={email} type="text" placeholder="example@gmail.com" id="email" />
            {error.email && <p>{error.email}</p>}
          </label>
          <label className={error.mobile && 'error'}>
            <span>Mobile</span>
            <input onChange={handleChange} value={mobile} type="text" placeholder="0750622222" id="mobile" />
            {error.mobile && <p>{error.mobile}</p>}
          </label>
          <label className={error.address && 'error'}>
            <span>Address</span>
            <input onChange={handleChange} value={address} type="text" placeholder="185 Berry Street" id="address" />
            {error.address && <p>{error.address}</p>}
          </label>
          <label className={error.city && 'error'}>
            <span>City</span>
            <input onChange={handleChange} value={city} type="text" placeholder="London" id="city" />
            {error.city && <p>{error.city}</p>}
          </label>
          <label className={error.postcode && 'error'}>
            <span>Postcode</span>
            <input onChange={handleChange} value={postcode} type="text" placeholder="CN3912" id="postcode" />
            {error.postcode && <p>{error.postcode}</p>}
          </label>
          <label>
            <span>Country</span>
            <div>United Kingdom</div>
          </label>
        </fieldset>
      </section>
      <section>
        <h4>Payment Information</h4>
        <fieldset>
          <label id="stripe-card-element" className={cardError.error && 'error'}>
            <span>Card</span>
            {cardError.error && <p>{cardError.message}</p>}
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </label>
        </fieldset>
      </section>
      <button disabled={!stripe || loading} type="submit">
        {loading ? (
          <>
            <span>Loading</span>
            <LoaderIcon />
          </>
        ) : (
          <>
            {'Pay'}<span>&#163;{state.paymentIntent.amount}</span>
          </>
        )}
      </button>
    </FormWrapper>
  )
}

export default Form
