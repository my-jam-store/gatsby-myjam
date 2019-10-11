import React from "react"
import { Item, ArrowDown } from "./Components"
import SubItems from "./SubItems"

export default ({ title, subCategories, id }) => (
  <Item data-id={id}>
    <span>{title}</span>
    <ArrowDown />
    <SubItems categories={subCategories} />
  </Item>
)