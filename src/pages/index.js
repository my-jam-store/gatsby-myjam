import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Home from "../components/Home"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { categories, cuisines } = data

  return (
    <Layout categories={categories.nodes}>
      <SEO title="Home" />
      <Home cuisines={cuisines.nodes} />
    </Layout>
  )
}

export default IndexPage

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
        
        cuisines: allAirtable(filter: { table: { eq: "Cuisines" }}) {
            totalCount
            nodes {
                recordId
                data {
                    cuisineId
                    name
                    slug
                }
            }
        }
    }
`;
