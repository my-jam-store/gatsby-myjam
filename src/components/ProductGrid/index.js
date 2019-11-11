import React, { useEffect, useState, useRef } from "react"
import { Grid, Title } from "./Components"
import GridItem from "./Product"
import ProductModal from "./ProductModal"

const ProductGrid = (props) => {
  const [ item, setItem ] = useState({})
  const [ showModal, setModalState ] = useState(false)

  const componentMounted = useRef(false)

  const g = props.globalState
  const currentPage = props.pageContext.currentPage

  let i = 0, j = 0 , numberOfItemsOnLatestPage = 0

  const js = !g.isInitialized
  const items = []

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

  if(g["page"+currentPage]) {
    for(let pageNum = currentPage ;; pageNum++) {
      const key = "page"+pageNum
      if (g[key]) {
        numberOfItemsOnLatestPage = g[key].length
        for(j = 0; j < numberOfItemsOnLatestPage; j++) {
          items.push(<GridItem js={js} item={g[key][j]} key={"gi"+(i++)} />)
        }
      }
      else {
        const lastFetchedPage = Math.min(g.cursor, props.pageContext.countPages)
        for (; pageNum <= lastFetchedPage; pageNum++) {
          for (j = 0; j < numberOfItemsOnLatestPage; j++) {
            items.push(<GridItem key={"gi"+(i++)}/>)
          }
        }
        break;
      }
    }
  }

  const handleProductModal = (e) => {
    if(!isMobile() && e.target.parentNode.getAttribute('data-id')) {
      componentMounted.current = true
      const item = e.target.parentNode
      setItem({
        recordId: item.getAttribute('data-id'),
        name: item.getAttribute('data-name'),
        price: item.getAttribute('data-price'),
        sku: item.getAttribute('data-sku'),
        description: item.getAttribute('data-description'),
      })
    }
  }

  const handleCloseModal = () => setModalState(false)

  useEffect(() => {
    if(componentMounted.current) {
      setModalState(true)
    }
  }, [item])

  return (
    <>
      <Title>{props.pageContext.name}</Title>
      <Grid onClick={handleProductModal}>
        {items}
      </Grid>
      <ProductModal
        isOpen={showModal}
        item={item}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default ProductGrid;