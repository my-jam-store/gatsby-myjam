import React, { useContext } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import AppContext from "../store/context"

const IndexPage = ({ data }) => {
  const { nodes } = data.allAirtable
  const { state } = useContext(AppContext)

  return (
    <Layout categories={[]}>
      <SEO title="Home" />
      <div>
        {nodes.map(({data, recordId}) => (
          <div key={recordId}>
            <img
              src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${data.sku}.jpg`}
              alt={data.name}
            />
            <h3>{data.name}</h3>
            <span>{data.price}</span>
            <a
              className="snipcart-add-item"
              data-item-id={recordId}
              data-item-name={data.name}
              data-item-price={data.price}
              data-item-url={`https://myjam.store/products`}
              data-item-description=""
              data-item-metadata={JSON.stringify({"shop":state.store, "unitType": data.unitType})}
            >
              Add To Cart
            </a>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const productsQuery = graphql`
    {
        allAirtable(filter: { table: { eq: "Products" }}) {
            nodes {
                recordId
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
`;
