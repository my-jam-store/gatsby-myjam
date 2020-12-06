const CheckoutSession = require('../session')
const stripe = require('../../../services/integrations/stripe')
const lineItems = require('../../../services/checkout/line-items')

class NewSession extends CheckoutSession {
  constructor(lineItemsData, metadata) {
    super()

    this.lineItemsData = lineItemsData
    this.metadata = typeof metadata === 'object' ? metadata : {}
  }

  async init() {
    const items = await lineItems.processedLineItems(this.lineItemsData)
    const session = await stripe.createCheckoutSession(items, this.metadata)

    this.assignSession(session)

    return this
  }
}

module.exports = NewSession
