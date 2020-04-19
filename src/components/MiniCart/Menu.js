import React, { useEffect, useState } from "react"
import { CloseIcon, Grid, Wrapper } from "../NavItemsMobile/Components"

const Menu = ({ isOpen, handleClose }) => {

  const handleMenuClose = () => {
    removeBlackLayer()
    handleClose()
  }

  useEffect(() => {
    return () => {
      const el = document.querySelector('.black-layer')
      return el && el.remove()
    }
  }, [])

  const addBlackLayer = () => {
    document.querySelector('html').style.overflowY = 'hidden'
    document.querySelector('html').style.height    = '100vh'
    document.querySelector('body').style.overflowY = 'hidden'
    document.querySelector('body').style.height    = '100vh'
    document.querySelector('body').style.position  = 'relative'
    const blackLayer = document.createElement("div")
    blackLayer.classList.add('black-layer')
    blackLayer.style.width = "100%"
    blackLayer.style.height = "100%"
    blackLayer.style.background = "#000"
    blackLayer.style.opacity = "0.6"
    blackLayer.style.zIndex = "5"
    blackLayer.style.position = "absolute"
    blackLayer.style.top = "0"
    blackLayer.style.left = "0"
    setTimeout(() => {
      document.querySelector('body').appendChild(blackLayer)
    }, 200)
  }

  const removeBlackLayer = () => {
    document.querySelector('.black-layer').remove()
    document.querySelector('html').removeAttribute('style')
    document.querySelector('body').removeAttribute('style')
  }

  if(isOpen) {
    addBlackLayer()
  }

  return (
    <div>
      <Wrapper style={{ left: isOpen ? '0%' : '-80%' }}>
        <Grid>
          <span>Cart</span>
          <CloseIcon onClick={handleMenuClose} />
        </Grid>
        <h4>Mini Cart Content</h4>
      </Wrapper>

    </div>
  )
}

export default Menu