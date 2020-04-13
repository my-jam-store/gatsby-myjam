import { SET_STORE, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QTY } from "./constants"

export default (state, action) => {
  const { type, payload } = action
  if(type === SET_STORE) {
    const updatedState = { 
      ...state,
      storeName: payload.storeName,
      storeCode: payload.storeCode
    }
    localStorage.setItem('globalStore', JSON.stringify(updatedState))
    return updatedState
  }
  if(type === ADD_ITEM_TO_CART) {
    const found = state.items.find(({ id }) => payload.id === id)
    const items = !found ? state.items.concat(payload) : state.items.map((item) => (
      item.id !== payload.id ? (item) : ({ ...item, qty: item.qty + payload.qty })
    ))
    const updatedState = { ...state, items }
    localStorage.setItem('globalStore', JSON.stringify(updatedState))
    return updatedState
  }

  if(type === REMOVE_ITEM_FROM_CART) {
    const updatedState = {
      ...state,
      items: state.items.filter(({id}) => id !== payload.itemId)
    }
    localStorage.setItem('globalStore', JSON.stringify(updatedState))
    return updatedState
  }

  if(type === UPDATE_ITEM_QTY) {
    const updatedState = {
      ...state,
      items: state.items.map((item) => (
        item.id !== payload.itemId ? (item) : ({ ...item, qty: payload.qty })
      ))
    }
    localStorage.setItem('globalStore', JSON.stringify(updatedState))
    return updatedState
  }
  return state
}