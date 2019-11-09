const path = require(`path`)
const fs = require(`fs`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        categories: allAirtable(filter: {table: {eq: "Categories"}}) {
          totalCount
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
        
        products: allAirtable(filter: {table: {eq: "Products"} }, sort: { fields: [data___productId] }) {
          totalCount
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
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(`Error retrieving categories data`, result.errors)
    }

    const { categories, products } = result.data

    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    const countProductsPerPage = 20

    for(let i = 0; i < categories.totalCount; i++) {
      const totalProductsPerCategory = products.nodes.filter((product) => (
        product.data.categories.indexOf(categories.nodes[i].recordId)) !== -1
      )

      const countPages = Math.ceil(totalProductsPerCategory.length / countProductsPerPage)

      for(let currentPage = 1; currentPage <= countPages; currentPage++) {
        const pathSuffix = currentPage > 1 ? currentPage : ""

        const startIndexInclusive = countProductsPerPage * (currentPage - 1)
        const endIndexExclusive = startIndexInclusive + countProductsPerPage
        const pageProducts = totalProductsPerCategory.slice(startIndexInclusive, endIndexExclusive)

        const pageData = {
          filePath: `/${pathSuffix}`,
          path: `/category/${categories.nodes[i].data.slug}/${pathSuffix}`,
          component: categoryTemplate,
          context: {
            name: categories.nodes[i].data.name,
            pageProducts: pageProducts,
            currentPage: currentPage,
            countPages: countPages,
            slug: categories.nodes[i].data.slug,
            recordId: categories.nodes[i].recordId,
            id: categories.nodes[i].data.categoryId
          }
        }

        createJSON(pageData)
        createPage(pageData)
      }
      console.log(`\nCreated ${countPages} pages of paginated content.`)
    }
  })
    .catch(error => {
      console.log(`Error retrieving categories data`, error)
    })
}

function createJSON(pageData) {
  const pathSuffix = pageData.filePath.substring(1)
  const dir = "public/paginationJson/"
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  const filePath = `${dir}${pageData.context.slug}${pathSuffix}.json`;
  const dataToSave = JSON.stringify(pageData.context.pageProducts);
  fs.writeFile(filePath, dataToSave, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}