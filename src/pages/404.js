import React from "react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/seo";
import * as Error404 from "../components/styles/404.module.scss"

export default function NotFound(props){
    const {location} = props;
    return (
        <>
            <Seo
            pagetitle={"ページが見つかりません"} 
            pagepath={location.pathname}
            />
            <Layout>
                <h1 className={Error404.title}>お探しのページが見つかりませんでした</h1>
            </Layout>
        </>
       
    )
}