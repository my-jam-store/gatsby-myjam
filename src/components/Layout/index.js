/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import ReactNotification from "react-notifications-component"
import Header from "../Header"
import { Main } from "./Components"
import "./layout.css"

const Index = ({ children, categories }) => {
  useEffect(() => {
    if(typeof window !== "undefined") {
      window.VIDEOASK_EMBED_CONFIG = {
        "kind": "widget",
        "url": "https://www.videoask.com/f71gdblja",
        "options": {
          "widgetType": "VideoThumbnailExtraLarge",
          "text": "Talk to me",
          "backgroundColor": "#440E5E",
          "position": "bottom-left"
        }
      }

      const script = document.createElement('script')
      script.id   = 'videoask'
      script.src   = 'https://www.videoask.com/embed/embed.js'
      script.type  = 'text/javascript'

      if(!document.getElementById('videoask')) {
        document.body.appendChild(script)
      }
    }
  }, [])

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
