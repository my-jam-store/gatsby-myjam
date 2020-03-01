import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import View from "../components/Category"

const storeProductsPage = ({ pageContext }) => {
  const { pageProducts, slug } = pageContext

  return (
    <Layout categories={[]}>
      <SEO title="Home" />
      <div>
        {pageProducts.map(({data, recordId}) => (
          <div key={recordId}>
            <img
              src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/markets/${data.sku}.jpg`}
              alt={data.name}
            />
            <h3>{data.name}</h3>
            <span>{data[slug]}</span>
            <a
              className="snipcart-add-item"
              data-item-id={recordId}
              data-item-name={data.name}
              data-item-price={data[slug]}
              data-item-url={`https://markets.myjam.store/products`}
              data-item-description=""
            >
              Add To Cart
            </a>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default storeProductsPage