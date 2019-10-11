import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"
import styled from "styled-components"

const Div = styled.div`
  width: 100%;
    @media only screen 
    and (max-device-width: 768px) {
    width: 100px;
    margin: 0 auto;
}
`

const Logo = () => {
  const data = useStaticQuery(graphql`
      query {
          placeholderImage: file(relativePath: { eq: "logo.png" }) {
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
      <Link to={`/`}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={`My Jam Store`} />
      </Link>
    </Div>
  )
}

export default Logo
