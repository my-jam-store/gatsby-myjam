/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")
const GlobalStore = require("./src/store/globalState").default
const { Elements } = require("@stripe/react-stripe-js")
const { loadStripe } = require("@stripe/stripe-js")

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

exports.wrapRootElement = ({ element }) => {
  return (
    <Elements stripe={stripePromise}>
      <GlobalStore>
        {element}
      </GlobalStore>
    </Elements>
  )
}
