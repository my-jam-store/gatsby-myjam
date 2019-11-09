import React, { useState, useEffect } from "react"
import { Container, Wrapper, Grid, NavItems, MenuIcon, CloseIcon } from "./Components"
import Item from "./Item"

export default ({ categories }) => {
  const [ leftVal, setLeftVal ]   = useState('-80%')
  const [ isOpen, setMenuStatus ] = useState(false)

  const handleMenuOpen = () => {
    if(isOpen) {
      document.querySelector('.black-layer').remove()
      document.querySelector('html').removeAttribute('style')
      document.querySelector('body').removeAttribute('style')
    }
    setMenuStatus(!isOpen)
  }

  useEffect(() => {
    if(isOpen) {
      document.querySelector('html').style.overflowY = 'hidden'
      document.querySelector('body').style.overflowY = 'hidden'
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
    setLeftVal(isOpen ? '0%' : '-80%')
  }, [isOpen])

  useEffect(() => {
    return () => {
      const el = document.querySelector('.black-layer')
      return el && el.remove()
    }
  }, [])

  return (
    <Container id="navMobile">
      <MenuIcon onClick={handleMenuOpen} />
      <Wrapper style={{
        left: leftVal
      }}>
        <Grid>
          <span>Menu</span>
          <CloseIcon onClick={handleMenuOpen} />
        </Grid>
        <NavItems>
          {categories.map(({ data }) => (data.mainCategory === 1 && (
            <Item
              id={data.categoryId}
              key={data.categoryId}
              title={data.name}
              subCategories={categories.filter(({ recordId }) => data.subCategories.indexOf(recordId) !== -1)}
            />
          )))}
        </NavItems>
      </Wrapper>
    </Container>
  )
}
