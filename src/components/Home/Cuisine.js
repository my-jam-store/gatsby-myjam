import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { Wrapper } from "./Components"

const Cuisine = ({name, slug}) => {
  const data = useStaticQuery(graphql`
      query {
          images: allFile {
              totalCount
              nodes {
                  relativePath
                  childImageSharp {
                      fluid(maxWidth: 600) {
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
          }
      }
  `)

  const renderImage = (img) => (
    <Img fluid={img.childImageSharp.fluid} />
  )


  return (
    <Wrapper>
      <Link to={`/cuisine/${slug}`}>
        {renderImage(data.images.nodes.find(img => img.relativePath.indexOf(slug) !== -1))}
        <h1>{name}</h1>
      </Link>
    </Wrapper>
  )
}

export default Cuisine
