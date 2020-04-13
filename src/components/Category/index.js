import React, { useContext, useEffect, useState } from "react"
import ProductGrid from "../ProductGrid"
import AppContext from "../../store/context"
import { setStoreAction } from "../../store/actions"

const View = (props) => {

  const [ store, setStore ] = useState('')
  const { state, dispatch } = useContext(AppContext)
  const { pageContext } = props

  useEffect(() => {
    if(pageContext.type === 'store') {
      dispatch(setStoreAction(pageContext.name, pageContext.slug.replace(/-/g,'_')))
      setStore(pageContext.name)
    }
  }, [])

  useEffect(() => {
    if(!!store) {
      localStorage.setItem('globalStore', JSON.stringify(state))
    }
  }, [store])

  return (
    <ProductGrid
      products={pageContext.pageProducts}
      pagesCounts={pageContext.countPages}
      title={pageContext.name}
      type={pageContext.type}
      slug={pageContext.slug}
    />
  )
}

export default View