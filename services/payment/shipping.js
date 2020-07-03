require('dotenv').config()
function amount() {
  return parseInt(parseFloat(process.env.SHIPPING_AMOUNT).toFixed(2) * 100)
}

module.exports = {
  amount
}
