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
        
        cuisines: allAirtable(filter: {table: {eq: "Cuisines"}}) {
          totalCount
          nodes {
            recordId
            data {
              cuisineId
              name
              slug
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
              cuisines
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(`Error retrieving categories data`, result.errors)
    }

    const { categories, products, cuisines } = result.data

    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    const cuisineTemplate  = path.resolve(`./src/templates/cuisine.js`)
    const countProductsPerPage = 30

    for(let i = 0; i < cuisines.totalCount; i++) {
      if(cuisines.nodes[i].slug === 'default') continue

      const totalProductsPerCuisine = products.nodes.filter((product) => (
        product.data.cuisines.indexOf(cuisines.nodes[i].recordId)) !== -1
      )

      if(totalProductsPerCuisine.length === 0) continue

      const countPages = Math.ceil(totalProductsPerCuisine.length / countProductsPerPage)

      for(let currentPage = 1; currentPage <= countPages; currentPage++) {
        const pathSuffix = currentPage > 1 ? currentPage : ""

        const startIndexInclusive = countProductsPerPage * (currentPage - 1)
        const endIndexExclusive = startIndexInclusive + countProductsPerPage
        const pageProducts = totalProductsPerCuisine.slice(startIndexInclusive, endIndexExclusive)

        const pageData = {
          filePath: `/${pathSuffix}`,
          path: `/cuisine/${cuisines.nodes[i].data.slug}/${pathSuffix}`,
          component: cuisineTemplate,
          context: {
            name: cuisines.nodes[i].data.name,
            pageProducts: pageProducts,
            currentPage: currentPage,
            countPages: countPages,
            slug: cuisines.nodes[i].data.slug,
            recordId: cuisines.nodes[i].recordId,
            id: cuisines.nodes[i].data.recordId
          }
        }

        createJSON(pageData)
        createPage(pageData)
      }
    }

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