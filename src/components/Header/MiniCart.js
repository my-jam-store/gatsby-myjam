import React, { useState, useEffect } from "react"
import { store } from "react-notifications-component"
import { CartIcon } from "./Components"
import "react-notifications-component/dist/theme.css"

const MiniCart = () => {
  const [ itemsCount, setItemsCount ] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Snipcart) {
      const count = window.Snipcart.api.items.count()
      setItemsCount(count)

      window.Snipcart.subscribe('cart.closed', () => {
        const count = window.Snipcart.api.items.count()
        setItemsCount(count)
      })

      window.Snipcart.subscribe('cart.ready', (data) => {
        const count = window.Snipcart.api.items.count()
        setItemsCount(count)
      })

      window.Snipcart.subscribe('item.adding', (ev, item, items) => {
        const count = window.Snipcart.api.items.count()
        setItemsCount(count + item.quantity)
        store.addNotification({
          title: "",
          message: "Item added to cart successfully!",
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true
          }
        })
      })
    }

    return () => {
      window.Snipcart.unsubscribe('cart.closed')
      window.Snipcart.unsubscribe('cart.ready')
      window.Snipcart.unsubscribe('item.adding')
    }
  }, [])

  return (
    <div>
      <a href="#" className="snipcart-checkout">
        <CartIcon />
        {itemsCount > 0 && (
          <span className="snipcart-total-items">{itemsCount}</span>
        )}
      </a>
    </div>
  )
}

export default MiniCart