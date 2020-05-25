import React, { useContext, useEffect, useState } from "react"
import { navigate } from "gatsby-link"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { FormWrapper } from "./Components"
import AppContext from "../../store/context"
import { LoaderIcon, ChangeAddress, ChangeAddressLabel } from "../MiniCart/Components"
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
  const [name, setName] = useState({ billing: '', shipping: ''})
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState({ billing: '', shipping: ''})
  const [address, setAddress] = useState({ billing: '', shipping: ''})
  const [city, setCity] = useState({ billing: '', shipping: ''})
  const [postcode, setPostcode] = useState({ billing: '', shipping: ''})
  const [sameAddress, setSameAddress] = useState(true)
  const [error, setError] = useState({})
  const [cardError, setCardError] = useState({ err: false, message: ''})

  const stripe = useStripe()
  const elements = useElements()

  const handleChange = (e) => {
    const key = e.target.id && e.target.id.split('-')[0];
    const type = e.target.getAttribute('data-form-type')
    const value = e.target.value
    switch (key) {
      case "name":
        setName({ ...name, [type]: value })
        break
      case "email":
        setEmail(value)
        break
      case "mobile":
        setMobile({ ...mobile, [type]: value })
        break
      case "address":
        setAddress({ ...address, [type]: value })
        break
      case "city":
        setCity({ ...city, [type]: value })
        break
      case "postcode":
        setPostcode({ ...postcode, [type]: value })
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
        shipping: {
          name: sameAddress ? name.billing : name.shipping,
          phone: sameAddress ? mobile.billing : mobile.shipping,
          address: {
            city: sameAddress ? city.billing : city.shipping,
            country: 'GB',
            line1: sameAddress ? address.billing : address.shipping,
            postal_code: sameAddress ? postcode.billing : postcode.shipping,
            state: null
          },
        },
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: city.billing,
              country: 'GB',
              line1: address.billing,
              postal_code: postcode.billing,
              state: null
            },
            email: email,
            name: name.billing,
            phone: mobile.billing
          }
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
        setLoading(false)
        navigate('/success')
      }
    } else {
      setLoading(false)
    }
  }

  const validateData = () => {
    let valid = true;
    if(name.billing.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        nameBilling: 'name is required'
      }))
      valid = false
    }

    if(!sameAddress && name.shipping.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        nameShipping: 'name is required'
      }))
      valid = false
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError((preState) => ({
        ...preState,
        email: 'email is invalid'
      }))
      valid = false
    }

    if(/^[a-zA-Z]+$/.test(mobile.billing)) {
      setError((preState) => ({
        ...preState,
        mobileBilling: 'mobile number is invalid'
      }))
      valid = false
    }

    if(!sameAddress && /^[a-zA-Z]+$/.test(mobile.shipping)) {
      setError((preState) => ({
        ...preState,
        mobileShipping: 'mobile number is invalid'
      }))
      valid = false
    }

    if(mobile.billing.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        mobileBilling: 'mobile number is required'
      }))
      valid = false
    }

    if(!sameAddress && mobile.shipping.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        mobileShipping: 'mobile number is required'
      }))
      valid = false
    }

    if(city.billing.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        cityBilling: 'city is required'
      }))
      valid = false
    }

    if(!sameAddress && city.shipping.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        cityShipping: 'city is required'
      }))
      valid = false
    }

    if(address.billing.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        addressBilling: 'address is required'
      }))
      valid = false
    }

    if(!sameAddress && address.shipping.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        addressShipping: 'address is required'
      }))
      valid = false
    }

    if(postcode.billing.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        postcodeBilling: 'postcode is required'
      }))
      valid = false
    }

    if(!sameAddress && postcode.shipping.trim().length === 0) {
      setError((preState) => ({
        ...preState,
        postcodeShipping: 'postcode is required'
      }))
      valid = false
    }

    return valid;
  }

  useEffect(() => {
    if(sameAddress) {
      setError({
        ...error,
        nameShipping: '',
        mobileShipping: '',
        addressShipping: '',
        cityShipping: '',
        postcodeShipping: ''
      })
    }
  }, [sameAddress]);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <p>Complete your shipping and payment details below</p>
      <section>
        <h4>Shipping & Billing Information</h4>
        <fieldset>
          <label className={error.nameBilling && 'error'}>
            <span>Name</span>
            <input onChange={handleChange} data-form-type="billing" value={name.billing} type="text" placeholder="Full Name" id="name-billing" />
            {error.nameBilling && <p>{error.nameBilling}</p>}
          </label>
          <label className={error.email && 'error'}>
            <span>Email</span>
            <input onChange={handleChange} data-form-type="billing" value={email} type="text" placeholder="example@gmail.com" id="email" />
            {error.email && <p>{error.email}</p>}
          </label>
          <label className={error.mobileBilling && 'error'}>
            <span>Mobile</span>
            <input onChange={handleChange} data-form-type="billing" value={mobile.billing} type="text" placeholder="0750622222" id="mobile-billing" />
            {error.mobileBilling && <p>{error.mobileBilling}</p>}
          </label>
          <label className={error.addressBilling && 'error'}>
            <span>Address</span>
            <input onChange={handleChange} data-form-type="billing" value={address.billing} type="text" placeholder="185 Berry Street" id="address-billing" />
            {error.addressBilling && <p>{error.addressBilling}</p>}
          </label>
          <label className={error.cityBilling && 'error'}>
            <span>City</span>
            <input onChange={handleChange} data-form-type="billing" value={city.billing} type="text" placeholder="London" id="city-billing" />
            {error.cityBilling && <p>{error.cityBilling}</p>}
          </label>
          <label className={error.postcodeBilling && 'error'}>
            <span>Postcode</span>
            <input onChange={handleChange} data-form-type="billing" value={postcode.billing} type="text" placeholder="CN3912" id="postcode-billing" />
            {error.postcodeBilling && <p>{error.postcodeBilling}</p>}
          </label>
          <label>
            <span>Country</span>
            <div>United Kingdom</div>
          </label>
        </fieldset>
        <div style={{ marginBottom: '10px'}}>
          <ChangeAddress
            type="checkbox"
            id="changeAddress"
            name="changeAddress"
            checked={!sameAddress}
            onChange={() => {setSameAddress(!sameAddress)}}
          />
          <ChangeAddressLabel htmlFor="changeAddress">
            Use different address for shipping
          </ChangeAddressLabel>
        </div>
        {!sameAddress && (
          <fieldset>
            <label className={error.nameShipping && 'error'}>
              <span>Name</span>
              <input onChange={handleChange} data-form-type="shipping" value={name.shipping} type="text" placeholder="Full Name" id="name-shipping" />
              {error.nameShipping && <p>{error.nameShipping}</p>}
            </label>
            <label className={error.mobileShipping && 'error'}>
              <span>Mobile</span>
              <input onChange={handleChange} data-form-type="shipping" value={mobile.shipping} type="text" placeholder="0750622222" id="mobile" />
              {error.mobileShipping && <p>{error.mobileShipping}</p>}
            </label>
            <label className={error.addressShipping && 'error'}>
              <span>Address</span>
              <input onChange={handleChange} data-form-type="shipping" value={address.shipping} type="text" placeholder="185 Berry Street" id="address-shipping" />
              {error.addressShipping && <p>{error.addressShipping}</p>}
            </label>
            <label className={error.cityShipping && 'error'}>
              <span>City</span>
              <input onChange={handleChange} data-form-type="shipping" value={city.shipping} type="text" placeholder="London" id="city-shipping" />
              {error.cityShipping && <p>{error.cityShipping}</p>}
            </label>
            <label className={error.postcodeShipping && 'error'}>
              <span>Postcode</span>
              <input onChange={handleChange} data-form-type="shipping" value={postcode.shipping} type="text" placeholder="CN3912" id="postcode-shipping" />
              {error.postcodeShipping && <p>{error.postcodeShipping}</p>}
            </label>
            <label>
              <span>Country</span>
              <div>United Kingdom</div>
            </label>
          </fieldset>
        )}
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
