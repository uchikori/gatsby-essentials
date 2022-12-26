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
            allContentfulCategory {
                edges {
                    node{
                        categorySlug
                        id
                    }
                }
            }
        }
    `)

    if(blogresult.errors){
        reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
        return
    }

    //記事一覧ページの生成
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
        createPage({
            path: `/cat/${edge.node.categorySlug}`,
            component: path.resolve(`./src/templates/category-template.js`),
            context: {
                catId: edge.node.id,
                skip: 0,        //0番目の記事からスキップする記事の個数
                limit: 100,     //1ページ内に表示する記事数
                currentPage: 1, //現在のページ
                isFirst: true,  //最初のページかどうか
                isLast: true,   //最後のページかどうか 
            }
        })
    })
}