import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";


export const Seo = (props) => {
    const {pagetitle, pagedesc} = props;

    const data = useStaticQuery(graphql `
        query {
            site{
                siteMetadata{
                    title
                    lang
                    description
                }
            }
        }
    `)
    const title = pagetitle ? `${pagetitle}|${data.site.siteMetadata.title} ` : data.site.siteMetadata.title;
    const description = pagedesc || data.site.siteMetadata.description;
    return (
        <Helmet>
            <html lang={data.site.siteMetadata.lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}