const ProductsQuery = `{
  allContentfulProducts {
    edges {
      node {
        id
        name
        sku
        price
        image {
          image
        }
        description {
          description
        }
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node }) => ({
    ...node,
    ...node.description,
    ...node.image
  }))

const queries = [
  {
    query: ProductsQuery,
    transformer: ({data}) => flatten(data.allContentfulProducts.edges),
  }
]

module.exports = queries