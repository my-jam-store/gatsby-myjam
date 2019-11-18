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
      <div></div>
      <div>
        <p>Myjam is a registered UK company. Registration number: 701938
          <br/>
          We can have the links on the left and the line on the right.
        </p>
      </div>
    </Grid>
  </Footer>
)