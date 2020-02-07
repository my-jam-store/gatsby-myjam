import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const Div = styled.div`
  width: 100%;
  @media only screen 
    and (max-device-width: 768px) {
    width: 50px;
    justify-self: left;
    grid-column-start: 1;
  }
`

const Logo = () => {
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
    <Div>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={`My Jam Store`} />
    </Div>
  )
}

export default Logo
