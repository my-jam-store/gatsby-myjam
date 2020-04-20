import { SET_STORE, ADD_ITEM_TO_CART, UPDATE_ITEM_QTY, REMOVE_ITEM_FROM_CART, SET_SESSION_ID } from "./constants"

export const setStoreAction = (storeName, storeCode) => ({
  type: SET_STORE,
  payload: { storeName, storeCode }
})

export const addItemAction = (name, id, qty, price) => ({
  type: ADD_ITEM_TO_CART,
  payload: { name, id, qty, price }
})

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