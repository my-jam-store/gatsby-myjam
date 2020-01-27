import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Product from "../components/Product"

const productPage = ({ data, pageContext }) => {
  const { allCategories } = data

  return (
    <Layout categories={allCategories.nodes}>
      <SEO title={pageContext.item.name} />
      <Product item={pageContext.item} recordId={pageContext.recordId} />
    </Layout>
  )
}

export default productPage

export const pageQuery = graphql`
    query{
        allCategories: allAirtable(filter: { table: { eq: "Categories" }}) {
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