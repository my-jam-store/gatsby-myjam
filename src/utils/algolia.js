const ProductsQuery = `{
  allContentfulProducts {
    edges {
      node {
        id
        name
        sku
        price
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
    ...node.description
  }))

const queries = [
  {
    query: ProductsQuery,
    transformer: ({data}) => flatten(data.allContentfulProducts.edges),
  }
]

module.exports = queries