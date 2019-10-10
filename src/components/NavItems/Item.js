import React from "react"
import { Link } from "gatsby"
import { Item } from "./Components"

export default ({ title, slug }) => (
  <Link to={`/category/${slug}`}>
    <Item>
      <span>{title}</span>
    </Item>
  </Link>
)