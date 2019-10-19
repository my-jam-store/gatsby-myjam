import React, { useState, useEffect } from "react"
import { CartIcon } from "./Components"

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

      window.Snipcart.subscribe('item.adding', function (ev, item, items) {
        const count = window.Snipcart.api.items.count()
        setItemsCount(count + item.quantity)
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