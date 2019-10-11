import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const categoryPage = ({ data }) => {
  const { category, products, allCategories: { nodes } } = data
  console.log(products)
  const name = "test";
  return (
    <Layout categories={nodes}>
      <SEO title={name} />
      <div>
        <h1>{name}</h1>
      </div>
    </Layout>
  );
};

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