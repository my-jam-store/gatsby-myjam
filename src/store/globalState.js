import React, { useReducer } from "react"
import AppContext from "./context"

const initialState =  typeof window !== "undefined" && !!localStorage.getItem('globalStore')
  ? JSON.parse(localStorage.getItem('globalStore')) : { store: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORE':
      return {
        store: action.storeName
      }
    default:
      return state
  }
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