const NewSession = require('../../models/checkout/session/new')
const ExistingSession = require('../../models/checkout/session/existing')

async function create(lineItemsData, metadata) {
  return await new NewSession(lineItemsData, metadata).init()
}

async function get(sessionId, expandedData) {
  return await new ExistingSession(sessionId, expandedData).init()
}

module.exports = {
  create,
  get
}
