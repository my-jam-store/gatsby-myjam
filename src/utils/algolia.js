const ProductsQuery = `{
  allAirtable(filter: {table: {eq: "Products"}}) {
    nodes {
      data {
        productId
        name
        slug
        sku
        description
        price
        categories
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ data }) => ({
    ...data
  }))

const queries = [
  {
    query: ProductsQuery,
    transformer: ({ data }) => flatten(data.allAirtable.nodes),
  }
]

module.exports = queries