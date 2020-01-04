import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/Layout"

export default function Template({ data }) {
  const { categories, page } = data
  const { frontmatter, html } = page
  return (
    <Layout categories={categories.nodes}>
      <SEO title={frontmatter.title} />
      <div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
    query($path: String!) {
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
        
        page: markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`