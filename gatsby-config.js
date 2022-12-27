/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const path = require('path');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  /**Your site config here */
  siteMetadata:{
    title: `ESSENTIALS`,
    description: `おいしい食材と食事を探求するサイト`,
    lang: `ja`,
    siteUrl: `https://netlify.uchiwa-design.net`,
    locale: `ja_JP`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: path.join[__dirname, 'components/styles'],
        },
        // Override the file regex for Sass
        sassRuleTest: /\.s(a|c)ss$/,
        // Override the file regex for CSS modules
        sassRuleModulesTest: /\.module\.s(a|c)ss$/,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve:`gatsby-plugin-manifest`,
      options:{
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        host: process.env.GATSBY_CONTENTFUL_HOST,
      }
    }
  ],
}
