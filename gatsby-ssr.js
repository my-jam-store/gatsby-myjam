/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")
const GlobalStore = require("./src/store/globalState").default

exports.wrapRootElement = ({ element }) => {
  return <GlobalStore>{element}</GlobalStore>
}