import React, { useContext, useEffect, useState } from "react"
import { InfiniteScroll } from "./InfiniteScroll"
import ProductGrid from "../ProductGrid"
import AppContext from "../../store/context"

const View = (props) => {
  const [ cursor, setCursor ] = useState(0)
  const [ pages, setPages ]   = useState({})
  const [ store, setStore ]   = useState('')
  const { state, dispatch }   = useContext(AppContext)
  const { pageContext } = props

  const isInitializing = () => cursor === 0

  const loadMore = (pageContext, pageNum) => {
    setCursor(pageNum + 1)
    fetch(`${__PATH_PREFIX__}/paginationJson/${pageContext.type}-${pageContext.slug}${pageNum}.json`)
      .then(res => res.json())
      .then(
        res => {
          setPages({
            ...pages,
            ["page"+pageNum]: res
          })
        },
        error => console.log(error)
      )
  }

  const hasMore = (countPages) => {
    if (isInitializing()) return true
    return cursor <= countPages
  }

  useEffect(() => {
    if(pageContext.type === 'store') {
      dispatch({
        type: 'SET_STORE',
        storeName: pageContext.name,
        priceCode: pageContext.slug.replace(/-/g,'_')
      })
      setStore(pageContext.name)
    }

    const pageKey = "page" + pageContext.currentPage

    setPages({
      ...pages,
      [pageKey]: pageContext.pageProducts
    })
    setTimeout(() => {
      setCursor(pageContext.currentPage + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if(!!store) {
      localStorage.setItem('globalStore', JSON.stringify(state))
    }
  }, [store])

  return (
    <>
      <InfiniteScroll
        cursor={cursor}
        throttle={300}
        threshold={600}
        hasMore={hasMore(pageContext.countPages)}
        pageContext={pageContext}
        onLoadMore={loadMore}
      >
        <ProductGrid
          pageContext={pageContext}
          globalState={{
            cursor,
            ...pages,
          }}
        />
      </InfiniteScroll>

      {(cursor === 0 || hasMore(pageContext.countPages)) && (
        <h3>
          Loading.....
        </h3>
      )}
    </>
  )
}

export default View