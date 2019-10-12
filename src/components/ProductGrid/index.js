import React from "react"
import { Grid } from "./Components"

const ProductGrid = ({ products }) => {

  return (
    <Grid>
      {products.map(({ data }) => (
        <div key={data.productId}>
          <h2>{data.name}</h2>
          <h2>{data.price}</h2>
          <h2>{data.description}</h2>
        </div>
      ))}
    </Grid>
  )
}

export default ProductGrid