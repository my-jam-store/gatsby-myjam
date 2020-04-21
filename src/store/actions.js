import { SET_STORE, ADD_ITEM_TO_CART, UPDATE_ITEM_QTY, REMOVE_ITEM_FROM_CART, SET_SESSION_ID } from "./constants"

export const setStoreAction = (storeName, storeCode) => ({
  type: SET_STORE,
  payload: { storeName, storeCode }
})

export const addItemAction = (name, id, sku, qty, price) => {
  const image = getImageUrl(sku)
  return {
    type: ADD_ITEM_TO_CART,
    payload: { name, id, image, qty, price }
  }
}

export const removeItemAction = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: { itemId }
})

export const updateItemQtyAction = (itemId, qty) => ({
  type: UPDATE_ITEM_QTY,
  payload: { itemId, qty }
})

export const setSessionId = (sessionId) => ({
  type: SET_SESSION_ID,
  payload: { sessionId }
})


const getImageUrl = (sku) => (
  `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${sku}.jpg`
)