const queries = require("./src/utils/algolia")

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-snipcart',
      options: {
        apiKey: `${process.env.GATSBY_SNIPCART_API_KEY}`
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `${process.env.AIRTABLE_API_KEY}`,
        tables: [
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Products`
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Categories`
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Cuisines`
          },
          {
            baseId: `${process.env.AIRTABLE_BASE_ID}`,
            tableName: `Stores`
          }
        ]
      }
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
