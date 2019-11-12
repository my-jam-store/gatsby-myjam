/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import ReactNotification from "react-notifications-component"
import Header from "../Header"
import { Main } from "./Components"
import "./layout.css"

const Index = ({ children, categories }) => {
  return (
    <>
      <ReactNotification />
      <Header categories={categories || []} />
      <div>
        <Main>{children}</Main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
  categories: PropTypes.array
}

export default Index
