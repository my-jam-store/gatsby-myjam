import React from "react"
import { List } from "./Components"
import { Link } from "gatsby"

const SubItems = ({ categories, isOpen }) => {
  const handlePageScrolling = () => {
    document.querySelector('html').removeAttribute('style')
    document.querySelector('body').removeAttribute('style')
  }

  return (
    <List className={isOpen ? 'active' : 'hide'}>
      {categories.map(({ data }) => (
        <Link to={`/category/${data.slug}/`} key={data.categoryId} onClick={handlePageScrolling}>
          <span>{data.name}</span>
        </Link>
      ))}
    </List>
  )
}

export default SubItems