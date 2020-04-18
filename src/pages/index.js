import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const IndexPage = () => {

  return (
    <Layout categories={[]}>
      <SEO title="Home" />
      <h2 style={{fontWeight: '500'}}>Please make sure to scan the QR code to access nearby supermarkets</h2>
    </Layout>
  )
}

export default IndexPage