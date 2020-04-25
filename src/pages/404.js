import React from "react"
import Index from "../components/Layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const NotFoundPage = ({ data }) => {
  const { categories } = data
  return (
    <Index categories={categories.nodes} stickyFooter={true}>
      <SEO title="404: Not found"/>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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

export default NotFoundPage
