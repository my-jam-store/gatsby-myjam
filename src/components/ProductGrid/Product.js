import React, { useContext, useState } from "react"
import { Item, PlusIcon, QuantityBoxMobile, CartIcon, QtyMinus, QtyPlus, ErrorMessage } from "./Components"
import AppContext from "../../store/context"
import { addItemAction } from "../../store/actions"
import { showMessage } from "../../utils/notification"

const Product = React.memo(({ js, item }) => {
  const [ quantity, setQuantity ] = useState(1)
  const [ err, setErr ] = useState(null)
  const { state, dispatch } = useContext(AppContext)

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

  const getFormattedPrice = (item) => {
    const price = !!item.data[state.storeCode] ? item.data[state.storeCode] : item.data.price;
    return (price).toFixed(2);
  }

  const addItemToCart = () => {
    if(quantity > 0) {
      dispatch(addItemAction(
        item.data.name,
        item.recordId,
        item.data.sku,
        Number.parseInt(quantity),
        getFormattedPrice(item)))
      showMessage('Item added to cart successfully', 'success')
      setTimeout(() => {
        setQuantity(1)
        setErr('')
      }, 500)
    } else {
      setErr('invalid quantity value')
    }
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
        >
          <img
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.data.sku}.jpg`}
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
        </Item>
      )}
    </>
  )
})
export default Product
