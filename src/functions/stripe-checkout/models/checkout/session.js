const stripe = require('../../services/integrations/stripe')

class CheckoutSession {
  get charges() {
    return this.payment_intent.charges.data[0]
  }

  get phone() {
    return this.metadata.phone
  }

  get promotionCodeId() {
    return this.total_details.breakdown.discounts.length
      ? this.total_details.breakdown.discounts[0].discount.promotion_code
      : null
  }

  async promotionCode() {
    const promotionCodeId = this.promotionCodeId
    const promotionCode = promotionCodeId ? await stripe.promotionCode(promotionCodeId) : null

    return promotionCode ? promotionCode.code : null
  }

  assignSession(session) {
    this.clearInitProperties()
    Object.assign(this, session)
  }

  clearInitProperties() {
    for (const property in this) {
      delete this[property]
    }
  }
}

module.exports = CheckoutSession
