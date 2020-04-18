import React, { useContext, useState } from "react"
import Modal from "react-modal"
import { Content, QuantityBox, QtyPlus, QtyMinus, CartIcon, CloseIcon } from "./Components"
import AppContext from "../../store/context"
import { addItemAction } from "../../store/actions"
import { showMessage } from "../../utils/notification"

const ProductModal = ({ isOpen, item, handleClose }) => {
  const [ qty, setQty ] = useState(1)
  const [ err, setErr ] = useState(null)
  const { dispatch } = useContext(AppContext)

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

  const handleCloseModal = () => {
    handleClose()
    setTimeout(() => {
      setQty(1)
      setErr('')
    }, 500)
  }

  const addItemToCart = () => {
    if(qty > 0) {
      dispatch(addItemAction(
        item.name,
        item.recordId,
        Number.parseInt(qty),
        item.price))

      showMessage('Item added to cart successfully', 'success')
      handleCloseModal()
    } else {
      setErr('invalid quantity value')
    }
  }
  
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={100}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      className="modal"
    >
      <Content>
        <div>
          <img
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/q_auto,f_auto/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
            alt={item.name}
          />
        </div>
        <div className="product-info">
          <h3 className="name">{item.name}</h3>
          <p>{item.description}</p>
          <span className="price">&#163;{item.price}</span>
          <br/>
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
        </div>
        <CloseIcon onClick={handleCloseModal} />
      </Content>
    </Modal>
  )
}

export default ProductModal
