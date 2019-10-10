import React from "react"
import { Container, Header, CartIcon, UserIcon, Grid } from "./Components"
import SearchBox from "../SearchBox"
import NavItems from "../NavItems"
import Logo from "./Logo"

export default ({ categories }) => (
  <Container>
    <Header>
      <Logo />
      <SearchBox />
      <Grid>
        <UserIcon />
        <CartIcon />
      </Grid>
    </Header>
    <NavItems categories={categories} />
  </Container>
)