import React from "react"
import { List } from "./Components"
import { Link } from "gatsby"

const SubItems = ({ categories, isOpen }) => (
  <List className={isOpen ? 'active' : 'hide'}>
    {categories.map(({ data }) => (
      <Link to={`/category/${data.slug}/`} key={data.categoryId}>
        <span>{data.name}</span>
      </Link>
    ))}
  </List>
)

export default SubItems