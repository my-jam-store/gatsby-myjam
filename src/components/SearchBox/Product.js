import React, { useState } from "react"
import { Item, PlusIcon, QuantityBoxMobile, CartIcon, QtyMinus, QtyPlus } from "./Components"

const Product = React.memo(({ item }) => {
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

  return (
    <Item
      data-id={item.recordId}
      data-sku={item.sku}
      data-price={item.price}
      data-name={item.name}
    >
      <img
        src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
        alt={item.name}
      />
      <h3 className="price">
        <span>&#163;{item.price}</span>
        <PlusIcon />
      </h3>
      <span className="name">{item.name}</span>
      <QuantityBoxMobile>
        <span>Quantity: (Kg)</span>
        <div>
          <input type="number" value={quantity} onChange={handleQuantityChange} />
          <QtyPlus onClick={handleQuantityIncrement} />
          <QtyMinus onClick={handleQuantityDecrement} />
        </div>
        <div>
          <button>
            <CartIcon/>
            <span>Add To Cart</span>
          </button>
        </div>
      </QuantityBoxMobile>
    </Item>
  )
})
export default Product