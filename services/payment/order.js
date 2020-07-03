require('dotenv').config()
const airtable = require('../integrations/airtable')

function createOrder(data, items) {
  airtable.createRecord(
    process.env.AIRTABLE_ORDER_VIEW,
    data,
    (err, record) => {
      if (err) {
        console.error(err)
        return
      }

      items.forEach(item => {
        item.fields['order_id'] = [ record.id ]
      })

      addItems(items)
    }
  )
}

function addItems(items) {
  airtable.createRecord(process.env.AIRTABLE_ORDER_ITEMS_VIEW, items)
}

module.exports = {
  createOrder,
  addItems
}
