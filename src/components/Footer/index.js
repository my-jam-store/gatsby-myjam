import React from "react"
import { Link } from "gatsby"
import { Footer, Grid, Links } from "./Components"

export default () => (
  <Footer>
    <Grid>
      <Links>
        <Link to={'/terms'}>Terms</Link>
        <Link to={'/privacy'}>Privacy</Link>
        <Link to={'/returns'}>Returns</Link>
      </Links>
      <p>Myjam is a registered UK company. Registration number: 701938</p>
    </Grid>
  </Footer>
)