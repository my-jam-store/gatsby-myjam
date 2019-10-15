import React from "react"
import { Item } from "./Components"

const Product = ({ js, item }) => {
  if(js) {
    console.log(item.data)
  }
  return (
    <>
      {js && (
        <Item key={item.data.productId}>
            <img
              src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.data.sku}.jpg`}
              alt={item.data.name}
            />
            <h3>{item.data.name}</h3>
            <span>{item.data.price}</span>
        </Item>
      )}
    </>
  )
}

export default Product