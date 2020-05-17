import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { LogoBlock } from "./Components"

const Header = () => {
  const data = useStaticQuery(graphql`
      query {
          placeholderImage: file(relativePath: { eq: "logo.png" }) {
              childImageSharp {
                  fluid(maxWidth: 100) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
      }
  `)

  return (
    <LogoBlock>
      <Link to={`/`}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={`My Jam Store`} />
      </Link>
    </LogoBlock>
  )
}

export default Header
