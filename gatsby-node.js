const path= require("path")
const{ documentToPlainTextString } = require("@contentful/rich-text-plain-text-renderer")

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
        allContentfulCategory {
            edges {
                node{
                    categorySlug
                    id
                    category
                    blogpost {
                        title
                    }
                }
            }
        }
    }
    `)

    if(blogresult.errors){
        reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
        return
    }

    //記事ページの生成
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

    //記事一覧ページの生成
    const blogPostPerPage = 6;
    const blogPosts = blogresult.data.allContentfulBlogPost.edges.length;
    const pages = Math.ceil(blogPosts / blogPostPerPage);
    const array = Array.from({ length:pages });
    array.forEach((item, index) => {
        createPage({
            path: index === 0 ? `/blog/` : `blog/post/${index + 1}`,
            component: path.resolve(`./src/templates/blog-template.js`),
            context: {
                skip: blogPostPerPage * index, //0番目の記事からスキップする記事の個数
                limit: blogPostPerPage,        //1ページ内に表示する記事数
                currentPage: index + 1,        //現在のページ
                isFirst: index + 1 === 1,      //最初のページかどうか
                isLast: index + 1 === pages,   //最後のページかどうか
            }
        })
    })


    //カテゴリーページの生成
    blogresult.data.allContentfulCategory.edges.forEach((edge) => {
        const catPostPerPage = 6;
        const catPosts = edge.node.blogpost.length;
        const catPages = Math.ceil(catPosts / catPostPerPage);
        const catArray = Array.from({ length: catPages });

        catArray.forEach((item, index) => {
            createPage({
                path: index === 0 ? `/cat/${edge.node.categorySlug}/` : `/cat/${edge.node.categorySlug}/${index + 1}/`,
                component: path.resolve(`./src/templates/category-template.js`),
                context: {
                    catId: edge.node.id,
                    catName: edge.node.category,
                    catSlug: edge.node.categorySlug,
                    skip: catPostPerPage * index, //0番目の記事からスキップする記事の個数
                    limit: catPostPerPage,        //1ページ内に表示する記事数
                    currentPage: index + 1,        //現在のページ
                    isFirst: index + 1 === 1,      //最初のページかどうか
                    isLast: index + 1 === catPages,   //最後のページかどうか
                }
            })
        })
    })
}

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if(node.internal.type === `contentfulBlogPostContentRichTextNode`){
        createNodeField({
            node,
            name: `description`,
            value: `${documentToPlainTextString(JSON.parse(node.content)).slice(
                0,
                70
            )}...`,
        })
    }
}