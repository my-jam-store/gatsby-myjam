import React, { useState } from "react"
import { Item, PlusIcon, QuantityBoxMobile, CartIcon, QtyMinus, QtyPlus } from "./Components"

const Product = React.memo(({ js, item }) => {
  const [ quantity, setQuantity ] = useState(1)

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleQuantityIncrement = () => {
    const newQty = Number.parseInt(quantity) + 1
    setQuantity(newQty)
  }

  const handleQuantityDecrement = () => {
    const newQty = Number.parseInt(quantity) - 1
    if(newQty > 0) {
      setQuantity(newQty)
    }
  }

  const handleRestQty = () => {
    setTimeout(() => setQuantity(1), 500)
  }

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
          <QuantityBoxMobile>
            <span>Quantity: (Kg)</span>
            <div>
              <input type="number" value={quantity} onChange={handleQuantityChange} />
              <QtyPlus onClick={handleQuantityIncrement} />
              <QtyMinus onClick={handleQuantityDecrement} />
            </div>
            <div>
              <button
                onClick={handleRestQty}
                className="snipcart-add-item"
                data-item-id={item.recordId}
                data-item-name={item.data.name}
                data-item-price={item.data.price}
                data-item-quantity={quantity}
                data-item-url={`url/products`}
              >
                <CartIcon/>
                <span>
                  Add To Cart
                </span>
              </button>
            </div>
          </QuantityBoxMobile>
        </Item>
      )}
    </>
  )
})
export default Product