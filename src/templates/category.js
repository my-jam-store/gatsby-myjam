import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import View from "../components/Category"
import { GlobalStateContext } from "../store/globalState.js"

const categoryPage = ({ data, pageContext }) => {
  const { allCategories } = data

  return (
    <Layout categories={allCategories.nodes}>
      <GlobalStateContext.Consumer>
        {globalState => (
          <>
            <SEO title={pageContext.name} />
            <View globalState={globalState} pageContext={pageContext} />
          </>
        )}
      </GlobalStateContext.Consumer>
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