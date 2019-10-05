import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Container, Header, Div } from "./Components"
import SearchBox from "../SearchBox";

import Logo from "./Logo"

export default () => (
  <Container>
    <Header>
      <Logo />
      <Div>
        <SearchBox />
      </Div>
    </Header>
  </Container>
)