import React, { useState, useEffect, useContext } from "react"
import AppContext from "../../store/context"
import { CartIcon, Content, QtyMinus, QtyPlus, QuantityBox } from "../ProductsGrid/Components"

const Product = ({item, recordId}) => {
  const [ qty, setQty ] = useState(1)
  const { state } = useContext(AppContext)

  const handleQuantityChange = (e) => {
    setQty(e.target.value)
  }

  const handleQuantityIncrement = () => {
    const newQty = Number.parseInt(qty) + 1
    setQty(newQty)
  }

  const handleQuantityDecrement = () => {
    const newQty = Number.parseInt(qty) - 1
    if(newQty > 0) {
      setQty(newQty)
    }
  }

  const getFormattedPrice = (item) => {
    const price = !!item[state.priceCode] ? item[state.priceCode] : item.price;
    return (price).toFixed(2);
  }

  return (
    <Content>
      <div>
        <img
          src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
          alt={item.name}
        />
      </div>
      <div className="product-info">
        <h3 className="name">{item.name}</h3>
        <p>{item.description}</p>
        <span className="price">&#163;{getFormattedPrice(item)}</span>
        <br/>
        <span>Quantity</span>
        <QuantityBox>
          <div>
            <input type="number" value={qty} onChange={handleQuantityChange} />
            <QtyPlus onClick={handleQuantityIncrement} />
            <QtyMinus onClick={handleQuantityDecrement} />
          </div>
          <div>
            <button
              className="snipcart-add-item"
              data-item-id={recordId}
              data-item-name={item.name}
              data-item-price={getFormattedPrice(item)}
              data-item-quantity={qty}
              data-item-url={!!item[state.priceCode] ? `https://myjam.store/store/${state.priceCode}/products` : `https://myjam.store/products`}
              data-meta={JSON.stringify({
                shop:state.store,
                sku: item.sku,
                inStore: !!item[state.priceCode]
              })}
            >
              <CartIcon/>
              <span>Add To Cart</span>
            </button>
          </div>
        </QuantityBox>
      </div>
    </Content>
  )
}

export default Product