import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

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
    <div>
      <Link to={`/`}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} alt={`My Jam Store`} />
      </Link>
    </div>
  )
}

export default Logo
