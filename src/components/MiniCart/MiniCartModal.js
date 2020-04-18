import React from "react"
import Modal from "react-modal"
import CartContent from "./Content"

const MiniCartModal = ({isOpen, handleClose}) => {
  const closeModal = () => handleClose()
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={100}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal"
    >
      <CartContent />
    </Modal>
  )
}

export default MiniCartModal