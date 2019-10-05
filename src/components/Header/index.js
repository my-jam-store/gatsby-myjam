import React from "react"
import { Container, Header, CartIcon, UserIcon, Grid } from "./Components"
import SearchBox from "../SearchBox";
import Logo from "./Logo"

export default () => (
  <Container>
    <Header>
      <Logo />
      <SearchBox />
      <Grid>
        <UserIcon />
        <CartIcon />
      </Grid>
    </Header>
  </Container>
)