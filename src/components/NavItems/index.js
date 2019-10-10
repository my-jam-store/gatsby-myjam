import React from "react"
import { Container, NavItems } from "./Components"
import Item from "./Item"

export default ({ categories }) => {
  return (
    <Container>
      <NavItems>
        {categories.map(({ data }) => (
          <Item title={data.name} key={data.categoryId} slug={data.slug} />
        ))}
      </NavItems>
    </Container>
  )
}
