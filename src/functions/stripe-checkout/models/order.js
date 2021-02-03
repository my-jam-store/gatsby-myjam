const DataObject = require('./data-object')

class Order extends DataObject {
  constructor(checkoutSession, promotionCode) {
    super()
    this.init(checkoutSession, promotionCode)
  }

  get paymentIntentId() {
    return this.payment_intent_id
  }

  set paymentIntentId(paymentIntentId) {
    this.payment_intent_id = paymentIntentId
  }

  get customerName() {
    return this.customer_name
  }

  set customerName(customerName) {
    this.customer_name = customerName
  }

  get email() {
    return this._email
  }

  set email(email) {
    this._email = email
  }

  get couponCode() {
    return this.coupon_code
  }

  set couponCode(couponCode) {
    this.coupon_code = couponCode || ''
  }

  get total() {
    return this._total
  }

  set total(total) {
    this._total = parseFloat((total / 100).toFixed(2))
  }

  get date() {
    return this._date
  }

  set date(date) {
    this._date = new Date(date * 1000).toISOString()
  }

  get address() {
    return this._address
  }

  set address(address) {
    this._address = Array.isArray(address) ? address.filter(Boolean).join(' - ') : address
  }

  get postCode() {
    return this.post_code
  }

  set postCode(postCode) {
    this.post_code = postCode
  }

  get city() {
    return this._city
  }

  set city(city) {
    this._city = city
  }

  get phoneNumber() {
    return this.phone_number
  }

  set phoneNumber(phone) {
    this.phone_number = phone
  }

  init(checkout, promotionCode) {
    const billing = checkout.payment_intent.shipping || checkout.charges.billing_details

    this.paymentIntentId = checkout.payment_intent.id
    this.customerName = billing.name
    this.email = checkout.charges.billing_details.email
    this.couponCode = promotionCode
    this.total = checkout.payment_intent.amount
    this.date = checkout.charges.created
    this.address = [billing.address.line1, billing.address.line2]
    this.postCode = billing.address.postal_code
    this.city = billing.address.city
    this.phoneNumber = checkout.phone || billing.phone
  }
}

module.exports = Order
