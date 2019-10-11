import React from "react"
import { Container, Header, CartIcon, UserIcon, Grid } from "./Components"
import SearchBox from "../SearchBox"
import NavItems from "../NavItems"
import NavItemsMobile from "../NavItemsMobile"
import Logo from "./Logo"

export default ({ categories }) => (
  <Container>
    <Header>
      { window.innerWidth <= 768 && (
        <NavItemsMobile categories={categories} />
      )}
      <Logo />
      <SearchBox />
      <Grid>
        <UserIcon />
        <CartIcon />
      </Grid>
    </Header>
    { window.innerWidth > 768 && (
      <NavItems categories={categories} />
    )}
  </Container>
)