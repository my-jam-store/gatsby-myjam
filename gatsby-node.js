const path = require(`path`)
const fs = require(`fs`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      { 
        stores: allAirtable(filter: {table: {eq: "MarketStores"}}) {
          totalCount
          nodes {
            recordId
            data {
              name
              storeCode
            }
          }
        }
        
        products: allAirtable(filter: {table: {eq: "MarketProducts"} }, sort: { fields: [data___productId] }) {
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
              stores
              4GPM_75_bedford
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

    const { products, stores, pages } = result.data

    pages.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`./src/templates/page.js`),
        context: {},
      })
    })

    const storeTemplate    = path.resolve(`./src/templates/store.js`)
    const countProductsPerPage = 30

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