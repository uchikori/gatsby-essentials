import React from "react";
import { Layout } from "../components/Layout";
import * as Error404 from "../components/styles/404.module.scss"

export default function NotFound(){
    return (
        <>
            <Layout>
                <h1 className={Error404.title}>お探しのページが見つかりませんでした</h1>
            </Layout>
        </>
       
    )
}