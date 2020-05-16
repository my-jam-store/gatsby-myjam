import React, { useReducer } from "react"
import AppContext from "./context"
import reducer from "./reducer"

const initialState =  typeof window !== "undefined" && !!localStorage.getItem('globalStore')
  ? JSON.parse(localStorage.getItem('globalStore'))
  : {
      storeName: null,
      storeCode: null,
      paymentIntent: null,
      items: []
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
