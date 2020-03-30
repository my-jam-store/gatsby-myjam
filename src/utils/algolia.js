const ProductsQuery = `{
  allAirtable(filter: {table: {eq: "Products"}}) {
    nodes {
      recordId
      data {
        productId
        name
        slug
        sku
        description
        price
        categories
        PFJX_88_Westside
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ recordId, data }) => ({
    recordId,
    ...data
  }))

const queries = [
  {
    query: ProductsQuery,
    transformer: ({ data }) => flatten(data.allAirtable.nodes),
  }
]

module.exports = queries