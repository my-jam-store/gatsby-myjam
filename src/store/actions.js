import {
  SET_STORE,
  ADD_ITEM_TO_CART,
  UPDATE_ITEM_QTY,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  SET_PAYMENT_INTENT,
  SET_PAYMENT_INTENT_VALUE
} from "./constants"

export const setStoreAction = (storeName, storeCode) => ({
  type: SET_STORE,
  payload: { storeName, storeCode }
})

export const addItemAction = (name, id, sku, quantity, price) => {
  const image = getImageUrl(sku)
  return {
    type: ADD_ITEM_TO_CART,
    payload: { name, id, sku, image, quantity, price }
  }
}

export const removeItemAction = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: { itemId }
})

export const updateItemQtyAction = (itemId, quantity) => ({
  type: UPDATE_ITEM_QTY,
  payload: { itemId, quantity }
})

export const clearCart = () => ({
  type: CLEAR_CART,
  payload: {}
})

export const setPaymentIntent = ( id, amount, shipping, coupon, discount) => ({
  type: SET_PAYMENT_INTENT,
  payload: { id, amount, shipping, coupon, discount }
})

const getImageUrl = (sku) => (
  `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${sku}.jpg`
)
