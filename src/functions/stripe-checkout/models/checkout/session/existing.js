const CheckoutSession = require('../session')
const stripe = require('../../../services/integrations/stripe')

const sessionExpandedData = [
  'line_items.data.price.product',
  'payment_intent',
  'total_details.breakdown.discounts'
]

class ExistingSession extends CheckoutSession {
  constructor(sessionId, expandedData = sessionExpandedData) {
    super()

    this.sessionId = sessionId
    this.expandedData = Array.isArray(expandedData) ? expandedData : []
  }

  async init() {
    const session = await stripe.checkoutSession(this.sessionId, this.expandedData)
    this.assignSession(session)

    return this
  }
}

module.exports = ExistingSession
