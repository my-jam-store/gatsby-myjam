import React, { useEffect, useRef, useState } from "react"
import { connectHits } from "react-instantsearch-dom"
import { Grid, Title, Div } from "./Components"
import ProductModal from "../ProductGrid/ProductModal"
import Product from "./Product"

const Hits = connectHits(({ hits }) => {
  const [ item, setItem ] = useState({})
  const [ showModal, setModalState ] = useState(false)

  const componentMounted = useRef(false)

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

  const handleProductModal = (e) => {
    if(!isMobile() && e.target.parentNode.getAttribute('data-id')) {
      componentMounted.current = true
      const item = e.target.parentNode
      setItem({
        recordId: item.getAttribute('data-id'),
        name: item.getAttribute('data-name'),
        sku: item.getAttribute('data-sku'),
        description: item.getAttribute('data-description'),
        price: item.getAttribute('data-price'),
        metaData: item.getAttribute('data-meta'),
        url: item.getAttribute('data-url')
      })
    }
  }

  const handleCloseModal = () => setModalState(false)

  useEffect(() => {
    if(componentMounted.current) {
      setModalState(true)
    }
  }, [item])

  useEffect(() => {
    if(hits.length > 0) {
      const gridHeight = document.querySelector('#searchResult').offsetHeight
      document.body.style.height = `${gridHeight}px`
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.removeAttribute('style')
    }
  }, [])

  return (
    <Div id="searchResult">
      <Title>Search Result</Title>
      <Grid onClick={handleProductModal}>
        {hits.map((hit) => (
          <Product key={hit.recordId} js={true} item={hit} />
        ))}
      </Grid>
      <ProductModal
        isOpen={showModal}
        item={item}
        handleClose={handleCloseModal}
      />
    </Div>
  )
})

export default Hits