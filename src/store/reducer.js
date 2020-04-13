import { SET_STORE, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QTY } from "./constants"

export default (state, action) => {
  const { type, payload } = action
  if(type === SET_STORE) {
    return {
      ...state,
      storeName: payload.storeName,
      storeCode: payload.storeCode
    }
  }

  if(type === ADD_ITEM_TO_CART) {
    return {
      ...state,
      items: state.items.concat(payload)
    }
  }

  if(type === REMOVE_ITEM_FROM_CART) {
    return {
      ...state,
      items: state.items.filter(({id}) => id !== payload.itemId)
    }
  }

  if(type === UPDATE_ITEM_QTY) {
    return {
      ...state,
      items: state.items.map((item) => (
        item.id !== payload.itemId ? (item) : ({ ...item, qty: payload.qty })
      ))
    }
  }

  return state
}