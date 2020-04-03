const ProductsQuery = `{
  allAirtable(filter: {table: {eq: "Products"}}) {
    nodes {
      recordId
      data {
        productId
        name
        slug
        sku
        stores
        description
        price
        simply_jazz_mental
        valve_brass_statue
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