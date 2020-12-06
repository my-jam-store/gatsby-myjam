const product = {
  type: 'shipping_fee',
  name: 'Shipping Fee'
}

function amount(subtotal) {
  return !isFreeShipping(subtotal) ? process.env.SHIPPING_FEE * 100 : 0
}

function isShippingProduct(productType) {
  return productType === this.product.type
}

function isFreeShipping(subtotal) {
  return subtotal >= process.env.FREE_SHIPPING_SUBTOTAL
}

module.exports = {
  amount,
  isShippingProduct,
  product
}
