import React, { useState, useEffect, useContext } from "react"
import Index from "../components/Layout"
import EmptyCart from "../components/MiniCart/EmptyCart"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import AppContext from "../store/context"

export default ({ data }) => {
    const [ clearCart, setClearCart ] = useState(false)
    const { state } = useContext(AppContext)
    const { categories } = data

    useEffect(() => {
        gtag('event', 'purchase', {
            "transaction_id": state.paymentIntent.id,
            "value": state.paymentIntent.amount,
            "currency": "GBP",
            "shipping": state.paymentIntent.shipping,
            "items": state.items.map((item) => ({
                "id": item.sku,
                "name": item.name,
                "quantity": item.quantity,
                "price": item.price,
            }))
        });
        setClearCart(true)
    }, [])
    return (
      <Index categories={categories.nodes} stickyFooter={true}>
          <SEO title="Success Page" />
          <h2 style={{lineHeight: '1.5'}}>Thanks for purchasing from Myjam. We will contact you when we start sourcing your items.</h2>
          {clearCart && (<EmptyCart />)}
      </Index>
    )
}

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
    }
`

