import React from "react"
import { Container, NavItems } from "./Components"
import Item from "./Item"

export default ({ categories }) => {
  const handleNavItemStatus = (e) => {
    if(e.target.nodeName === 'NAV')
      return

    let navItem
    if(e.target.nodeName === 'DIV') {
      navItem = e.target
    }
    if(e.target.parentNode.nodeName === 'DIV') {
      navItem = e.target.parentNode
    }

    if(!!navItem) {

      Array.from(e.target.closest('nav').children).forEach((child) => {
        if(child.getAttribute('data-id') !== navItem.getAttribute('data-id')) {
          child.querySelector('div').classList.remove('active')
          child.querySelector('svg').classList.remove('rotate')
        }
      })

      const subItems  = navItem.querySelector('div')
      const arrowIcon = navItem.querySelector('svg')
      navItem.classList.toggle('active')
      subItems.classList.toggle('active')
      arrowIcon.classList.toggle('rotate')
    }
  }

  return (
    <Container id="navDesktop">
      <NavItems onClick={handleNavItemStatus}>
        {categories.map(({ data }) => (data.mainCategory === 1 && (
          <Item
            id={data.categoryId}
            key={data.categoryId}
            title={data.name}
            subCategories={categories.filter(({ recordId }) => data.subCategories.indexOf(recordId) !== -1)}
          />
        )))}
      </NavItems>
    </Container>
  )
}
