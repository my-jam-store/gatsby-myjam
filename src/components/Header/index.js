import React from "react"
import { Container, Header, Grid } from "./Components"
import Logo from "./Logo"
import MiniCart from "./MiniCart"
import Customer from "./Customer"

export default () => {
  const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768

  return (
    <Container>
      <Header>
        <Logo />
        {!isMobile() && (
          <div>
            <h1 className={"home-title"}>A Marketplace For Exotic Grocery.</h1>
          </div>
        )}
        <Grid>
          <Customer />
          <MiniCart />
        </Grid>
      </Header>
    </Container>
  )
}