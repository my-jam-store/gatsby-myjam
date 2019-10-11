const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allAirtable(filter: {table: {eq: "Categories"}}) {
          nodes {
            recordId
            data {
              categoryId
              name
              slug
              mainCategory
              subCategories
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(`Error retrieving categories data`, result.errors)
    }

    const categoryTemplate = path.resolve(`./src/templates/category.js`)

    result.data.allAirtable.nodes.forEach(({ recordId, data }) => {
      createPage({
        path: `/category/${data.slug}/`,
        component: slash(categoryTemplate),
        context: {
          slug: data.slug,
          recordId: recordId,
          id: data.categoryId
        }
      })
    })
  })
    .catch(error => {
      console.log(`Error retrieving categories data`, error)
    })
}