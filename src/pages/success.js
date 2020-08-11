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

  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

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
      <Index categories={categories.nodes} stickyFooter={false}>
          <SEO title="Success Page" />
          <iframe
            style={ isMobile() ? { margin: '-60px 0 -20px' } : {}}
            src="https://giphy.com/embed/l0MYt5jPR6QX5pnqM"
            width={isMobile() ? '100%' : '480'}
            height="270"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
          <p><a href="https://giphy.com/gifs/party-the-office-hard-l0MYt5jPR6QX5pnqM">via GIPHY</a></p>
          <h1>Thank you for your order</h1>
          <h2 style={{lineHeight: '1.5', marginBottom: '50px', fontSize: '22px'}}>
            We received your order. We haven't charged your card yet. We will charge it on the day of dispatch, based on items availability.
            You can track your order status <a href='https://orders.myjam.store/'>https://orders.myjam.store/</a> with the same email used when the order was placed.
          </h2>
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

