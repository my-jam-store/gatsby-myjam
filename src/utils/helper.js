export const formatPayload = (items) => {
  const lineItems = items.map((item) => {
    return {
      fields: {
        name: item.name,
        image: item.image,
        price: Number(item.price),
        sku: item.sku,
        qty: item.quantity
      }
    }
  })

  const amount = items.reduce((total, item) => {
    return total + (item.quantity * Number(item.price) * 100)
  }, 0)

  return {
    amount: Number(amount/100),
    line_items: lineItems
  }
}

export const getUrl = (endpoint) => {
  const url = process.env.GATSBY_CHECKOUT_SERVER_URL
  return url.substr(-1) === '/' ? url + endpoint : url + '/' + endpoint
}

export const getTodayDate = () => {
  const today = new Date();
  const D = String(today.getDate()).padStart(2, '0');
  const M = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const Y = today.getFullYear();

  return D + '/' + M + '/' + Y
}
