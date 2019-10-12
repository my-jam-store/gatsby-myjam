import React from "react"
import { Item } from "./Components"

const Product = ({ data }) => {
  const { productId, name, price, sku } = data
  return (
    <Item key={productId}>
      <img src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${sku}.jpg`} alt={name} />
      <h3>{name}</h3>
      <span>{price}</span>
    </Item>
  )
}

export default Product