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
        hogs_evenly_spring
        slices_rise_added
        dinner_tried_builds
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