import React, { useReducer } from "react"
import AppContext from "./context"

const initialState =  typeof window !== "undefined" && !!localStorage.getItem('globalStore')
  ? JSON.parse(localStorage.getItem('globalStore')) : { storeName: null, storeCode: null, storeId: null }

const reducer = (state, action) => {
  const { type, payload } = action
  if(type === 'SET_STORE') {
    return { ...payload }
  }

  return state
}

const GlobalStore = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default GlobalStore