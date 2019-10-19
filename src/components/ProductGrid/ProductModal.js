import React, { useState } from "react"
import Modal from "react-modal"
import { Content, QuantityBox, QtyPlus, QtyMinus, CartIcon, CloseIcon } from "./Components"

const ProductModal = ({ isOpen, item, handleClose }) => {
  const [ qty, setQty ] = useState(1)

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
    setTimeout(() => setQty(1), 500)
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
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${item.sku}.jpg`}
            alt={item.name}
          />
        </div>
        <div className="product-info">
          <h3 className="name">{item.name}</h3>
          <p>{item.description}</p>
          <span className="price">&#163;{item.price}</span>
          <br/>
          <span>Quantity: (Kg)</span>
          <QuantityBox>
            <div>
              <input type="number" value={qty} onChange={handleQuantityChange} />
              <QtyPlus onClick={handleQuantityIncrement} />
              <QtyMinus onClick={handleQuantityDecrement} />
            </div>
            <div>
              <button
                onClick={handleCloseModal}
                className="snipcart-add-item"
                data-item-id={item.recordId}
                data-item-name={item.name}
                data-item-price={item.price}
                data-item-quantity={qty}
                data-item-url="https://myjam.store/products"
              >
                <CartIcon/>
                <span>
                  Add To Cart
                </span>
              </button>
            </div>
          </QuantityBox>
        </div>
        <CloseIcon onClick={handleCloseModal} />
      </Content>
    </Modal>
  )
}

export default ProductModal
