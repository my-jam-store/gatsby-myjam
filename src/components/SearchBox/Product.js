import React, { useContext, useState } from "react"
import { Item, PlusIcon, QuantityBoxMobile, CartIcon, QtyMinus, QtyPlus } from "./Components"
import AppContext from "../../store/context"

const Product = React.memo(({ item }) => {
  const [ quantity, setQuantity ] = useState(1)
  const { state } = useContext(AppContext)

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

  const getFormattedPrice = (item) => {
    const price = !!item[state.priceCode] ? item[state.priceCode] : item.price;
    return (price).toFixed(2);
  }

  return (
    <Item
      data-id={item.recordId}
      data-price={getFormattedPrice(item)}
      data-name={item.name}
      data-sku={item.sku}
      data-description={item.description}
      data-url={!!item[state.priceCode] ? `https://myjam.store/store/${state.priceCode}/products` : `https://myjam.store/products`}
      data-meta={JSON.stringify({
        shop:state.store,
        sku: item.sku,
        inStore: !!item[state.priceCode]
      })}
    >
      <img
        src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
        alt={item.name}
      />
      <h3 className="price">
        <span>&#163;{getFormattedPrice(item)}</span>
        <PlusIcon />
      </h3>
      <span className="name">{item.name.split(' ').map( word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</span>
      <QuantityBoxMobile>
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
            data-item-name={item.name}
            data-item-price={getFormattedPrice(item)}
            data-item-quantity={quantity}
            data-item-url={!!item[state.priceCode] ? `https://myjam.store/store/${state.priceCode}/products` : `https://myjam.store/products`}
            data-item-metadata={JSON.stringify({
              shop:state.store,
              sku: item.sku,
              inStore: !!item[state.priceCode]
            })}
          >
            <CartIcon/>
            <span>Add To Cart</span>
          </button>
        </div>
      </QuantityBoxMobile>
    </Item>
  )
})
export default Product