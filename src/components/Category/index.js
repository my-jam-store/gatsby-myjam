import React, { useContext, useEffect, useState } from "react"
import ProductGrid from "../ProductGrid"
import AppContext from "../../store/context"
import { setStoreAction } from "../../store/actions"

const View = (props) => {
  const { dispatch } = useContext(AppContext)
  const { pageContext } = props

  useEffect(() => {
    if(pageContext.type === 'store') {
      dispatch(setStoreAction(pageContext.name, pageContext.slug.replace(/-/g,'_')))
    }
  }, [])

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