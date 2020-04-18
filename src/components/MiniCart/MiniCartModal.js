import React from "react"
import Modal from "react-modal"

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
      <h1>Content</h1>
    </Modal>
  )
}

export default MiniCartModal