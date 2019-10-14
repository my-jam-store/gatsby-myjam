import React from "react"
import { InfiniteScroll } from "./InfiniteScroll"
import ProductGrid from "../ProductGrid"

const View = (props) => {

  if (props.globalState.isInitializing() || !props.globalState.useInfiniteScroll) {
    const pageKey = "page" + props.pageContext.currentPage
    props.globalState.updateState({
      [pageKey]: props.pageContext.pageProducts,
      cursor: props.pageContext.currentPage + 1
    })
  }

  const g = props.globalState
  const pageContext = props.pageContext

  return (
    <>
      <InfiniteScroll
        throttle={150}
        threshold={300}
        hasMore={g.hasMore(pageContext)}
        pageContext={pageContext}
        onLoadMore={g.loadMore}
      >
        <ProductGrid globalState={g} pageContext={pageContext} />

      </InfiniteScroll>

      {(g.cursor === 0 || g.hasMore(pageContext)) && (
        <h3>
          Loading.....
        </h3>
      )}
    </>
  )
}

export default View