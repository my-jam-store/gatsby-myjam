import React, { useReducer } from "react"
import AppContext from "./context"
import reducer from "./reducer"

const getUpdatedState = () => {
  const state = {}
  const preState = typeof window !== "undefined" ?
    JSON.parse(localStorage.getItem('globalStore')) : {}
  const nxtState = {
    storeName: "",
    storeCode: "",
    paymentIntent: {},
    items: [],
  }
  for(const key in nxtState) {
    if(
      preState[key] &&
      (typeof preState[key] === typeof nxtState[key]) &&
      (Array.isArray(preState[key]) === Array.isArray(nxtState[key])) &&
      (!!preState[key] === nxtState[key])
    ) {
      state[key] = preState[key]
    } else {
      state[key] = nxtState[key]
    }
  }

  return state
}

const GlobalStore = (props) => {
  const initialState =  typeof window !== "undefined" && !!localStorage.getItem('globalStore')
    ? getUpdatedState()
    : {
      storeName: "",
      storeCode: "",
      paymentIntent: {},
      items: [],
    }

  const [state, dispatch] = useReducer(reducer, initialState)
  if(typeof window !== "undefined") {
    localStorage.setItem('globalStore', JSON.stringify(state))
  }
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default GlobalStore
