import React, { useContext, useEffect, useState } from "react"
import { InfiniteScroll } from "./InfiniteScroll"
import ProductGrid from "../ProductGrid"
import AppContext from "../../store/context"

const View = (props) => {
  const [ cursor, setCursor ] = useState(0)
  const [ pages, setPages ]   = useState({})
  const [ store, setStore ]   = useState('')
  const { state, dispatch }   = useContext(AppContext)

  const isInitializing = () => cursor === 0

  const loadMore = (pageContext, pageNum) => {
    setCursor(pageNum + 1)
    fetch(`${__PATH_PREFIX__}/paginationJson/${pageContext.slug}${pageNum}.json`)
      .then(res => res.json())
      .then(
        res => {
          setPages({
            ...pages,
            ["page"+pageNum]: res
          })
        },
        error => this.setState({ useInfiniteScroll: false })
      )
  }

  const hasMore = (countPages) => {
    if (isInitializing()) return true
    return cursor <= countPages
  }

  useEffect(() => {
    if(props.pageContext.type === 'store') {
      dispatch({
        type: 'SET_STORE',
        storeName: props.pageContext.name,
        priceCode: props.pageContext.slug.replace(/-/g,'_')
      })
      setStore(props.pageContext.name)
    }

    const pageKey = "page" + props.pageContext.currentPage

    setCursor(props.pageContext.currentPage + 1)
    setPages({
      ...pages,
      [pageKey]: props.pageContext.pageProducts
    })
  }, [])

  useEffect(() => {
    if(!!store) {
      localStorage.setItem('globalStore', JSON.stringify(state))
    }
  }, [store])

  const pageContext = props.pageContext

  return (
    <>
      <InfiniteScroll
        cursor={cursor}
        throttle={300}
        threshold={1000}
        hasMore={hasMore(pageContext.countPages)}
        pageContext={pageContext}
        onLoadMore={loadMore}
      >
        <ProductGrid
          pageContext={pageContext}
          globalState={{
            cursor,
            ...pages,
            isInitialized: isInitializing()
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