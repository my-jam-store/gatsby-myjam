require('dotenv').config()
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
    `gatsby-plugin-offline`
  ],
}
