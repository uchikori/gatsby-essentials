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

    //記事一覧のページネーション設定
    const blogPostPerPage = 6;
    const blogPosts = blogresult.data.allContentfulBlogPost.edges.length;
    const pages = Math.ceil(blogPosts / blogPostPerPage);

    console.log(pages);

    const array = Array.from({ length:pages });
    array.forEach((item, index) => {
        createPage({
            path: index === 0 ? `/blog/` : `blog/post/${index + 1}`,
            component: path.resolve(`./src/templates/blog-template.js`),
            context: {
                skip: blogPostPerPage * index,
                limit: blogPostPerPage,
                currentPage: index + 1,
                isFirst: index + 1 === 1,
                isLast: index + 1 === pages
            }
        })
    })
}