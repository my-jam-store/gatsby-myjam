import React, { useContext, useState } from "react"
import { Item, PlusIcon, QuantityBoxMobile, CartIcon, QtyMinus, QtyPlus } from "./Components"
import AppContext from "../../store/context"

const Product = React.memo(({ js, item }) => {
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

  const handleResetQty = () => {
    setTimeout(() => setQuantity(1), 500)
  }

  const getFormattedPrice = (item) => {
    const price = !!item.data[state.storeCode] ? item.data[state.storeCode] : item.data.price;
    return (price).toFixed(2);
  }

  return (
    <>
      {js && (
        <Item
          data-id={item.recordId}
          data-price={getFormattedPrice(item)}
          data-name={item.data.name}
          data-sku={item.data.sku}
          data-description={item.data.description}
          data-url={!!item.data[state.storeCode] ? `https://myjam.store/store/${state.storeCode}/products` : `https://myjam.store/products`}
          data-meta={JSON.stringify({
            shop:state.storeName,
            sku: item.data.sku,
            inStore: !!item.data[state.storeCode]
          })}
        >
          <img
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.data.sku}.jpg`}
            alt={item.data.name}
          />
          <h3 className="price">
            <span>&#163;{getFormattedPrice(item)}</span>
            <PlusIcon />
          </h3>
          <span className="name">{item.data.name.split(' ').map( word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</span>
          <QuantityBoxMobile>
            <div>
              <input type="number" value={quantity} onChange={handleQuantityChange} />
              <QtyPlus onClick={handleQuantityIncrement} />
              <QtyMinus onClick={handleQuantityDecrement} />
            </div>
            <div>
              <button
                onClick={handleResetQty}
                className="snipcart-add-item"
                data-item-id={item.recordId}
                data-item-name={item.data.name}
                data-item-price={getFormattedPrice(item)}
                data-item-quantity={quantity}
                data-item-url={!!item.data[state.storeCode] ? `https://myjam.store/store/${state.storeCode}/products` : `https://myjam.store/products`}
                data-item-metadata={JSON.stringify({
                  shop:state.store,
                  sku: item.data.sku,
                  inStore: !!item.data[state.storeCode]
                })}
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