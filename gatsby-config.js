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
        // spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        // accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        // host: process.env.GATSBY_CONTENTFUL_HOST,
        spaceId: `4unusez0ikmh`,
        accessToken: `yb9S_9Le3DhMFNU8CjyWczA0l5g257QOhi2wG96u21o`,
        host: `cdn.contentful.com`,
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id:`GTM-KZSF45G`,
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        createLinkInHead: true,
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url:siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulPost } }) => {
              return allContentfulPost.edges.map((edge) => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: edge.node.content.fields.description,
                    date: edge.node.publishDate,
                    url: `${site.siteMetadata.siteUrl}/blog/post/${edge.node.slug}`,
                  }
                )
              })
            },
            query: `
              {
                allContentfulBlogPost(
                  sort: { fields: publishDate, order: DESC }
                ) {
                  edges {
                    node {
                      title
                      id
                      slug
                      publishDate
                      content {
                        fields{
                          description
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `ESSENTIAL RSS FEED`,
          },
        ],
      },
    },    
  ],
}
