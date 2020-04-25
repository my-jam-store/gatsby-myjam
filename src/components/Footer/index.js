import React from "react"
import { Link } from "gatsby"
import { Footer, Grid, Links } from "./Components"

export default ({ stickyFooter }) => (
  <Footer stickyFooter={stickyFooter}>
    <Grid>
      <Links>
        <Link to={"/terms-of-service"}>Terms</Link>
        <Link to={"/privacy-policy"}>Privacy</Link>
        <Link to={"/returns-policy"}>Returns</Link>
        <Link to={"/cookie-policy"}>Cookie Policy</Link>
      </Links>
      <p>All rights reserved @2020.</p>
    </Grid>
  </Footer>
)
