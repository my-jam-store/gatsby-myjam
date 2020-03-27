const queries = require("./src/utils/algolia")

module.exports = {
  siteMetadata: {
    title: `My Jam`,
    description: `A marketplace for exotic grocery.`,
    author: `@myJam`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: "gatsby-plugin-snipcart",
      options: {
        apiKey: `${process.env.GATSBY_SNIPCART_API_KEY}`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Nunito', 'sans-serif']
        }
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `${process.env.AIRTABLE_API_KEY}`,
        tables: [
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Products`,
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Categories`,
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Cuisines`,
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Stores`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: `${process.env.GATSBY_ALGOLIA_APP_ID}`,
        apiKey: `${process.env.ALGOLIA_ADMIN_KEY}`,
        indexName: `${process.env.ALGOLIA_INDEX_NAME}`,
        queries,
        chunkSize: 10000,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Jam`,
        icon: `src/images/logo.png`,
        short_name: `My Jam`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#000`,
        display: `standalone`,
      },
    },
    {
      resolve: "gatsby-plugin-csv-feed",
      options: {
        feeds: [
          {
            query: `
              {
                allAirtable(filter: {table: {eq: "Products"} }, sort: { fields: [data___productId] })
                {
                  nodes {
                    recordId
                    data {
                      productId
                      name
                      slug
                      sku
                      description
                      price
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { allAirtable } }) => {
              return allAirtable.nodes.slice(100,102).map(node => {
                return {
                  // "ID": `sku_id_v_${node.recordId}`,
                  "item_group_id": `prod_id_v_${node.recordId}`,
                  // "item_group_id": "prod_id_849031",
                  "title": node.data.name,
                  "name": node.data.name,
                  "size": "Small",
                  // "description": `Description`,
                  // "link": `https://zen-colden-f5dbb1.netlify.com/products`,
                  "image_link": `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_KEY}/image/upload/${process.env.GATSBY_CLOUDINARY_PATH}/my-jam/${node.data.sku}.jpg`,
                  "price": `${node.data.price} GBP`,
                  "item_category": `${node.data.name} Category`,
                };
              });
            },
            output: "/product-feed.csv",
          },
        ],
      },
    },
    `gatsby-plugin-offline`
  ],
}
