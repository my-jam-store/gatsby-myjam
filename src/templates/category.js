import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import View from "../components/Category"

const categoryPage = ({ data, pageContext }) => {
  const { allCategories } = data

  return (
    <Layout categories={allCategories.nodes}>
      <SEO title={pageContext.name} />
      <View pageContext={pageContext} />
    </Layout>
  )
}

export default categoryPage

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