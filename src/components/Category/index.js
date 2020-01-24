import React, { useContext, useEffect, useState } from "react"
import { InfiniteScroll } from "./InfiniteScroll"
import ProductGrid from "../ProductGrid"
import AppContext from "../../store/context"

const View = (props) => {

  const [ store, setStore ]   = useState('')
  const { state, dispatch }   = useContext(AppContext)
  const { pageContext } = props

  useEffect(() => {
    if(pageContext.type === 'store') {
      dispatch({
        type: 'SET_STORE',
        storeName: pageContext.name,
        priceCode: pageContext.slug.replace(/-/g,'_')
      })
      setStore(pageContext.name)
    }
  }, [])

  useEffect(() => {
    if(!!store) {
      localStorage.setItem('globalStore', JSON.stringify(state))
    }
  }, [store])

  return (
    <ProductGrid pagesCounts={pageContext.countPages} title={pageContext.name} />
  )
}

export default View