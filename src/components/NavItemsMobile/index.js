import React, { useState, useEffect } from "react"
import { Container, Wrapper, Grid, NavItems, MenuIcon, CloseIcon } from "./Components"
import Item from "./Item"

export default ({ categories }) => {
  const [ leftVal, setLeftVal ]   = useState('-80%')
  const [ isOpen, setMenuStatus ] = useState(false)

  const handleMenuOpen = () => {
    if(isOpen) {
      document.querySelector('.black-layer').remove()
    }
    setMenuStatus(!isOpen)
  }

  useEffect(() => {
    if(isOpen) {
      const blackLayer = document.createElement("div")
      blackLayer.classList.add('black-layer')
      blackLayer.style.width = "100vh"
      blackLayer.style.height = "100vh"
      blackLayer.style.background = "#000"
      blackLayer.style.opacity = "0.6"
      blackLayer.style.zIndex = "5"
      blackLayer.style.position = "absolute"
      blackLayer.style.top = "0"
      document.querySelector('body').appendChild(blackLayer)
    }
    setLeftVal(isOpen ? '0%' : '-80%')
  }, [isOpen])

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
