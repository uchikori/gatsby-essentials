import { faChevronLeft, faChevronRight, faClock, faFolderOpen, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Layout } from "../components/Layout";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import { Seo } from "../components/seo";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const options = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node, children) => {
            return (
                <h2>
                    <FontAwesomeIcon icon={faCheckSquare} />
                    {children}
                </h2>
            )
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return (
                <>
                    <GatsbyImage image={node.data.target.gatsbyImageData} alt={node.data.target.description ? node.data.target.description : node.data.target.title}/>
                </>
            )
        },
    },
    renderText: (text) => {
        return text.split('\n').reduce((children, textSegment, index) => {
            return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    },
}


export default function Blogpost(props){
    const { data, pageContext, location} = props;
    console.log(data)

    return (
        <>
            <Seo 
            pageTitle={data.contentfulBlogPost.title} 
            pagedesc={`${documentToPlainTextString(JSON.parse(data.contentfulBlogPost.content.raw)).slice(0, 70)}...`}
            pagepath={location.pathname}
            blogimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
            />
            <Layout>
                <div className="eyecatch">
                    <figure>
                        <GatsbyImage image={data.contentfulBlogPost.eyecatch.gatsbyImageData} alt={data.contentfulBlogPost.eyecatch.description} />
                    </figure>
                </div>

                <article className="content">
                    <div className="container">
                        <h1 className="bar">{data.contentfulBlogPost.title}</h1>

                        <aside className="info">
                            <time dateTime={data.contentfulBlogPost.publishDate}><FontAwesomeIcon icon={faClock}/>{data.contentfulBlogPost.publishDateJP}</time>

                            <div className="cat">
                                <FontAwesomeIcon icon={faFolderOpen} />
                                <ul>
                                    {data.contentfulBlogPost.category.map((cat) => {
                                        return (
                                            <li className={cat.categorySlug} key={cat.id}>{cat.category}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </aside>

                        <div className="postbody">
                            {renderRichText(data.contentfulBlogPost.content, options)}
                        </div>

                        <ul className="postlink">
                            {pageContext.previous && (
                                <li className="prev">
                                    <Link to={`/blog/post/${pageContext.previous.slug}/`} rel="prev">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                        <span>{pageContext.previous.title}</span>
                                    </Link>
                                </li>
                            )}
                            {pageContext.next && (
                                <li className="next">
                                    <Link to={`/blog/post/${pageContext.next.slug}/`} rel="next">
                                        <span>{pageContext.next.title}</span>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </article>

            </Layout>
        </>
    )
}

export const query = graphql`
query($id: String!) {
    contentfulBlogPost(id:{ eq: $id}){
        title
        publishDateJP:publishDate(formatString: "YYYY年MM月DD日")
        publishDate
        category {
            category
            categorySlug
            id
        }
        eyecatch {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED,)
            description
            file {
                details {
                    image {
                        height
                        width
                    }
                }
                url
            }
        }
        content{
            raw
            references {
                ...on ContentfulAsset {
                    contentful_id
                    __typename
                    gatsbyImageData(layout: FULL_WIDTH)
                    title
                    description
                }
            }
        }
    }
}
`