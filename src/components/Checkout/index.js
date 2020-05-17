import React, { useContext, useEffect } from "react"
import AppContext from "../../store/context"
import { PageContainer } from "./Components"
import Header from "./Header"
import Form from "./Form"
import Summary from "./Summary"

const Checkout = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const hubSpot = document && document.getElementById("hubspot-messages-iframe-container")
    if(hubSpot) {
      hubSpot.remove()
    }
    const loading = document && document.getElementById("loading-checkout")
    if(loading) {
      loading.remove()
    }
  }, [])

  return (
    <PageContainer>
      <div>
        <Header />
        <Form />
      </div>
      <Summary/>
    </PageContainer>
  )
}

export default Checkout
