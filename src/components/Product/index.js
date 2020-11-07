import React, { useState, useContext } from "react"
import AppContext from "../../store/context"
import {
  CartIcon,
  Content,
  ErrorMessage, Item, PlusIcon,
  QtyMinus,
  QtyPlus,
  QuantityBox,
  QuantityBoxMobile,
} from "../ProductsGrid/Components"
import { addItemAction } from "../../store/actions"
import { showMessage } from "../../utils/notification"

const Product = ({item, recordId}) => {
  const [ qty, setQty ] = useState(1)
  const [ err, setErr ] = useState(null)
  const { state, dispatch } = useContext(AppContext)

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

  const getFormattedPrice = (item) => {
    const price = !!item[state.storeCode] ? item[state.storeCode] : item.price;
    return (price).toFixed(2);
  }

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

  const addItemToCart = () => {
    if(qty > 0) {
      dispatch(addItemAction(
        item.name,
        item.recordId,
        item.sku,
        Number.parseInt(qty),
        item.price))

      showMessage('Item added to cart successfully', 'success')
    } else {
      setErr('invalid quantity value')
    }
  }

  return (
    <>
      {isMobile() ? (<Item
        data-id={item.recordId}
        data-price={getFormattedPrice(item)}
        data-name={item.name}
        data-sku={item.sku}
        data-description={item.description}
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
            <input type="number" value={qty} onChange={handleQuantityChange} />
            <QtyPlus onClick={handleQuantityIncrement} />
            <QtyMinus onClick={handleQuantityDecrement} />
          </div>
          {state.items.length >= 50 ? (
            <ErrorMessage>You can not add more than 50 items to the cart.</ErrorMessage>
          ) : (
            <div>
              <button onClick={addItemToCart}>
                <CartIcon/>
                <span>Add To Cart</span>
              </button>
            </div>
          )}
          {!!err && (<p style={{gridColumn:'1/-1', color: 'orangered', marginBottom: '0px'}}>{err}</p>)}
        </QuantityBoxMobile>
      </Item>) : (<Content>
        <div>
          <img
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
            alt={item.name}
          />
        </div>
        <div className="product-info">
          <h3 className="name">{item.name}</h3>
          <p>{item.description}</p>
          <span className="price">&#163;{getFormattedPrice(item)}</span>
          <br/>
          {state.items.length >= 50 ? (
            <ErrorMessage>You can not add more than 50 items to the cart.</ErrorMessage>
          ) : (
            <>
              <span>Quantity</span>
              <QuantityBox>
                <div>
                  <input type="number" value={qty} onChange={handleQuantityChange} />
                  <QtyPlus onClick={handleQuantityIncrement} />
                  <QtyMinus onClick={handleQuantityDecrement} />
                </div>
                <div>
                  <button onClick={addItemToCart}>
                    <CartIcon/>
                    <span>
                  Add To Cart
                </span>
                  </button>
                </div>
                {!!err && (<p style={{gridColumn:'1/-1', color: 'orangered'}}>{err}</p>)}
              </QuantityBox>
            </>
          )}
        </div>
      </Content>)}
    </>
  )
}

export default Product
