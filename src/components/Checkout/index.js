import React, { useEffect } from "react"
import { PageContainer } from "./Components"
import Header from "./Header"
import Form from "./Form"
import Summary from "./Summary"
import SummaryMobile from "./SummaryMobile"

const Checkout = () => {
  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

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
        {isMobile() && <SummaryMobile />}
        <Form />
      </div>
      {!isMobile() && <Summary />}
    </PageContainer>
  )
}

export default Checkout
