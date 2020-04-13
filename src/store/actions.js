import { SET_STORE, ADD_ITEM_TO_CART, UPDATE_ITEM_QTY, REMOVE_ITEM_FROM_CART } from "./constants"

export const setStoreAction = (storeName, storeCode) => ({
  type: SET_STORE,
  payload: { storeName, storeCode }
})

export const addItemAction = (id, qty) => ({
  type: ADD_ITEM_TO_CART,
  payload: { id, qty }
})

export const removeItemAction = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: { itemId }
})

export const updateItemQtyAction = (itemId, qty) => ({
  type: UPDATE_ITEM_QTY,
  payload: { itemId, qty }
})