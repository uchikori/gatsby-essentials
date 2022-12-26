import React from "react";
import { Layout } from "../components/Layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Seo } from "../components/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function blog(props) {
    const { data, pageContext, location} = props;

    return(
        <>
        <Seo
        pagetitle={`CATEGORY: ${pageContext.catName}`}
        pagedesc={`「${pageContext.catName}」のカテゴリーページです`}
        pagepath={location.pathname}
        pageimg={null}
        />
        <Layout>
            <section className="content bloglist">
                <div className="container">
                    <h1 className="bar">CATEGORY:{pageContext.catName}</h1>

                    <div className="posts">

                        {data.allContentfulBlogPost.edges.map(({ node }) => {
                            return (
                                <article className="post" key={ node.id }>
                                    <Link to={`/blog/post/${node.slug}`}>
                                        <figure>
                                            <GatsbyImage 
                                            image={node.eyecatch.gatsbyImageData} 
                                            alt={node.eyecatch.description} 
                                            style={{ height: "100%" }}
                                            />
                                        </figure>
                                        <h3>{node.title}</h3>

                                    </Link>
                                </article>
                            )
                        })}

                    </div>

                    <ul className="pagenation">
                        {!pageContext.isFirst && (
                            <li className="prev">
                                <Link 
                                to={pageContext.currentPage === 2 ? `/cat/${pageContext.catSlug}` : `/cat/${pageContext.catSlug}/${pageContext.currentPage - 1}`} 
                                rel="prev">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <span>前のページ</span>
                                </Link>
                            </li>
                        )}

                        {!pageContext.isLast && (
                            <li className="next">
                                <Link to={`/cat/${pageContext.catSlug}/${pageContext.currentPage + 1}`} rel="next">
                                    <span>次のページ</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Link>
                            </li>
                        )}
                    </ul>

                </div>
            </section>
        </Layout>
        </>
    )
}

export const query = graphql`
query($catId: String!, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
        sort: {publishDate: DESC}, 
        skip:$skip, 
        limit:$limit,
        filter: {category: {elemMatch: {id: {eq: $catId}}}}
    ) {
        edges {
            node {
                title
                id
                eyecatch {
                    gatsbyImageData(
                        width: 573, 
                        layout: CONSTRAINED,
                        sizes: "(min-width: 1146px) 573px, 50vw"
                    )
                    description
                }
                slug
            }
        }
    }
}
`