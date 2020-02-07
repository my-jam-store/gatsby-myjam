import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import View from "../components/Category"

const categoryPage = ({ pageContext }) => {

  return (
    <Layout categories={[]}>
      <SEO title={pageContext.name} />
      <View pageContext={pageContext} />
    </Layout>
  )
}

export default categoryPage
