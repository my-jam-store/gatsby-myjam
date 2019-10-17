import React from "react"
import { Item } from "./Components"

const Product = React.memo(({ js, item }) => {
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
            <button
              className="snipcart-add-item"
              data-item-id={item.recordId}
              data-item-name={item.data.name}
              data-item-price={item.data.price}
              data-item-url="https://a888cd7c.ngrok.io/products"
              data-item-description="">
              Add To Cart
            </button>
        </Item>
      )}
    </>
  )
})
export default Product