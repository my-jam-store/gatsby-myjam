import React from "react"
import { Item, PlusIcon } from "./Components"

const Product = React.memo(({ js, item }) => {
  return (
    <>
      {js && (
        <Item
          data-id={item.recordId}
          data-sku={item.data.sku}
          data-price={item.data.price}
          data-name={item.data.name}
          data-description={item.data.description}
        >
            <img
              src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.data.sku}.jpg`}
              alt={item.data.name}
            />
            <h3 className="price">
              <span>&#163;{item.data.price}</span>
              <PlusIcon />
            </h3>
            <span className="name">{item.data.name}</span>
        </Item>
      )}
    </>
  )
})
export default Product