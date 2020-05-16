/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import GlobalStore from "./src/store/globalState"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

export const wrapRootElement = ({ element }) => (
  <Elements stripe={stripePromise}>
    <GlobalStore>
      {element}
    </GlobalStore>
  </Elements>
)
