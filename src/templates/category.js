import React from "react"
import { graphql } from "gatsby"
import Index from "../components/Layout"
import SEO from "../components/seo"
import ProductGrid from "../components/ProductGrid"

const categoryPage = ({ data }) => {
  const { category, products, allCategories } = data

  return (
    <Index categories={allCategories.nodes}>
      <SEO title={category.data.name} />
      <div>
        <ProductGrid title={category.data.name} products={products.nodes} />
      </div>
    </Index>
  )
}

export default categoryPage

export const pageQuery = graphql`
    query($id: Int!, $recordId: String!) {
        category: airtable(data: { categoryId : { eq: $id } }){
            data {
                categoryId
                name
            }
        }
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
        products: allAirtable(filter: {table: { eq: "Products" }, data: {categories: { eq: $recordId}}}) {
            nodes {
                data {
                    productId
                    name
                    slug
                    sku
                    price
                    categories
                }
            }
        }
    }
`