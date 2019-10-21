import React, { useState, useEffect } from "react"
import { GuestIcon, AuthUser, Menu } from "./Components"

const Customer = () => {
  const [ isOpen, setDashboardStatus ]      = useState(false)
  const [ authCustomer, setCustomerStatus ] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Snipcart) {

      const user = window.Snipcart.api.user.current()
      if(!!user) {
        setCustomerStatus(true)
      }

      window.Snipcart.subscribe('authentication.success', (email) => {
        setCustomerStatus(true)
      })

      window.Snipcart.subscribe('user.loggedout', () => {
        setCustomerStatus(false)
        setDashboardStatus(false)
      })
    }

    return () => {
      window.Snipcart.unsubscribe('authentication.success')
      window.Snipcart.unsubscribe('user.loggedout')
    }
  }, [])

  const handleOpenMenu = () => {
    setDashboardStatus(!isOpen)
  }

  return (
    <div>
      {!authCustomer ? (
        <a href="#" className="snipcart-user-profile">
          <GuestIcon />
        </a>
        ): (
        <>
        <AuthUser onClick={handleOpenMenu} />
        <Menu className={isOpen && 'active'}>
        <a href="#" className="snipcart-user-profile">
        My Orders
        </a>
        <a href="#" className="snipcart-edit-profile">
        Edit Profile
        </a>
        <a href="#" className="snipcart-user-logout">
        Logout
        </a>
        </Menu>
        </>
      )}
    </div>
  )
}

export default Customer