import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Home from "../components/Home"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout categories={[]}>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
