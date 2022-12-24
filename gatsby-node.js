const path= require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const blogresult = await graphql(`
        query {
            allContentfulBlogPost(sort: {publishDate: DESC}) {
                edges {
                    node {
                        id
                        slug
                    }
                    next {
                        slug
                        title
                    }
                    previous {
                        slug
                        title
                    }
                }
            }
        }
    `)

    if(blogresult.errors){
        reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
        return
    }

    blogresult.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            path: `/blog/post/${edge.node.slug}`,
            component: path.resolve(`./src/templates/blogpost-template.js`),
            context: {
                id: edge.node.id,
                next: edge.next,
                previous: edge.previous,
            }
        })
    })
}