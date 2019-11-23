/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import GlobalStore from "./src/store/globalState"

export const wrapRootElement = ({ element }) => (
  <GlobalStore>
    {element}
  </GlobalStore>
)