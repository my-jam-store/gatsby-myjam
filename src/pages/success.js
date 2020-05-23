import React from "react"
import Index from "../components/Layout"
import EmptyCart from "../components/MiniCart/EmptyCart"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export default ({ data }) => {
  const { categories } = data
  return (
    <Index categories={categories.nodes} stickyFooter={true}>
      <SEO title="Success Page" />
      <h2 style={{lineHeight: '1.5'}}>Thanks for purchasing from My Jam!</h2>

      <EmptyCart />
    </Index>
  )
}

export const categoriesQuery = graphql`
    query {
        categories: allAirtable(filter: { table: { eq: "Categories" }}) {
            nodes {
                recordId
                data {
                    categoryId
                    mainCategory
                    subCategories
                    name
                    slug
                }
            }
        }
    }
`

