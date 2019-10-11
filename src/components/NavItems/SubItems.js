import React from "react"
import { Grid } from "./Components"
import { Link } from "gatsby"

const SubItems = ({ categories, isOpen }) => (
  <Grid className={isOpen && 'active'}>
    {categories.map(({ data }) => (
      <Link to={`/category/${data.slug}`} key={data.categoryId}>
        <span>{data.name}</span>
      </Link>
    ))}
  </Grid>
)

export default SubItems