import React, { useEffect, useState, useRef } from "react"
import { Grid, Title } from "./Components"
import GridItem from "./Product"
import ProductModal from "./ProductModal"
import InfiniteScroll from "react-infinite-scroll-component"

const ProductGrid = ({ products, pagesCounts, title, type, slug }) => {
  const [ item, setItem ] = useState({})
  const [ pageNum, setPageNum ] = useState(1)
  const [ items, setItems ] = useState([...products])
  const [ hasMore, setHasMore ] = useState(true)
  const [ showModal, setModalState ] = useState(false)

  const componentMounted = useRef(false)

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

  const handleProductModal = (e) => {
    if(!isMobile() && e.target.closest('div').getAttribute('data-id')) {
      componentMounted.current = true
      const item = e.target.closest('div')
      setItem({
        recordId: item.getAttribute('data-id'),
        name: item.getAttribute('data-name'),
        sku: item.getAttribute('data-sku'),
        price: item.getAttribute('data-price'),
        description: item.getAttribute('data-description'),
        metaData: item.getAttribute('data-meta'),
        url: item.getAttribute('data-url')
      })
    }
  }

  const handleCloseModal = () => setModalState(false)

  const fetchMoreData = () => {
    if(pageNum >= pagesCounts) {
      setHasMore(false)
      return;
    }

    fetch(`${__PATH_PREFIX__}/paginationJson/${type}-${slug}${pageNum+1}.json`)
      .then(res => res.json())
      .then(
        res => {
          setPageNum(pageNum + 1)
          setItems(items.concat(res))
        },
        error => console.log(error)
      )
  };

  useEffect(() => {
    if(componentMounted.current) {
      setModalState(true)
    }
  }, [item])

  return (
    <>
      <Title>{title}</Title>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Grid onClick={handleProductModal}>
          {items.map((item) => (<GridItem js={true} item={item} key={item.recordId} />))}
        </Grid>
      </InfiniteScroll>
      <ProductModal
        isOpen={showModal}
        item={item}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default ProductGrid;