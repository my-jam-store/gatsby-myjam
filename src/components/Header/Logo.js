import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Div } from "./Components"

const Logo = () => {
  const data = useStaticQuery(graphql`
      query {
          placeholderImage: file(relativePath: { eq: "logo-myjam.png" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
      }
  `)

  return (
    <Div>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={`My Jam Store`} />
    </Div>
  )
}

export default Logo
