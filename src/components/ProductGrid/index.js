import React from "react"
import { Grid, Title } from "./Components"
import Product from "./Product"

const ProductGrid = ({ products, title }) => {
  return (
    <>
      <Title>{title}</Title>
      <Grid>
        {products.map(({ data }) => ( <Product key={data.productId} data={data} /> ))}
      </Grid>
    </>
  )
}

export default ProductGrid