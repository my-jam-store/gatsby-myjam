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
        
        stores: allAirtable(filter: {table: {eq: "Stores"}}) {
          totalCount
          nodes {
            recordId
            data {
              name
              storeCode
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
              stores
              simply_jazz_mental
              valve_brass_statue
            }
          }
        }
        
        pages: allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(`Error retrieving categories data`, result.errors)
    }

    const { categories, products, cuisines, stores, pages } = result.data

    pages.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`./src/templates/page.js`),
        context: {},
      })
    })

    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    const cuisineTemplate  = path.resolve(`./src/templates/cuisine.js`)
    const storeTemplate    = path.resolve(`./src/templates/store.js`)
    const productTemplate  = path.resolve(`./src/templates/product.js`)
    const countProductsPerPage = 30

    for(let i = 0; i < products.totalCount; i++) {
      const pageData = {
        path: `/product/${products.nodes[i].data.slug}/`,
        component: productTemplate,
        context: {
          item: products.nodes[i].data,
          recordId: products.nodes[i].recordId,
          type: 'product'
        }
      }

      createPage(pageData)
    }

    for(let i = 0; i < stores.totalCount; i++) {
      const totalProductsPerStore = products.nodes.filter((product) => (
        product.data.stores.indexOf(stores.nodes[i].recordId)) !== -1
      )

      if(totalProductsPerStore.length === 0) continue

      const countPages = Math.ceil(totalProductsPerStore.length / countProductsPerPage)

      for(let currentPage = 1; currentPage <= countPages; currentPage++) {
        const pathSuffix = currentPage > 1 ? currentPage : ""

        const startIndexInclusive = countProductsPerPage * (currentPage - 1)
        const endIndexExclusive = startIndexInclusive + countProductsPerPage
        const pageProducts = totalProductsPerStore.slice(startIndexInclusive, endIndexExclusive)

        const pageData = {
          filePath: `/${pathSuffix}`,
          path: `/store/${stores.nodes[i].data.storeCode.substr(3).replace(/\./g,'-')}/${pathSuffix}`,
          component: storeTemplate,
          context: {
            name: stores.nodes[i].data.name,
            pageProducts: pageProducts,
            currentPage: currentPage,
            countPages: countPages,
            slug: stores.nodes[i].data.storeCode.substr(3).replace(/\./g,'-'),
            recordId: stores.nodes[i].recordId,
            id: stores.nodes[i].recordId,
            type: 'store'
          }
        }

        createJSON(pageData)
        createPage(pageData)
      }

      const storePageData = {
        path: `/store/${stores.nodes[i].data.storeCode.substr(3).replace(/\./g,'_')}/products`,
        component: path.resolve(`./src/templates/storeProducts.js`),
        context: {
          name: stores.nodes[i].data.name,
          pageProducts: totalProductsPerStore,
          slug: stores.nodes[i].data.storeCode.substr(3).replace(/\./g,'_'),
          recordId: stores.nodes[i].recordId,
          id: stores.nodes[i].recordId,
        }
      }
      createPage(storePageData)
    }

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
            id: cuisines.nodes[i].recordId,
            type: 'cuisine'
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
            id: categories.nodes[i].data.categoryId,
            type: 'category'
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
  const filePath = `${dir}${pageData.context.type}-${pageData.context.slug}${pathSuffix}.json`;
  const dataToSave = JSON.stringify(pageData.context.pageProducts);
  fs.writeFile(filePath, dataToSave, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}