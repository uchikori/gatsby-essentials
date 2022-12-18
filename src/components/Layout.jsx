import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import "./layout.css";


export const Layout = (props) => {
    const {children} = props;
    console.log(children);

    return (
        <div>
            <Header />
                {children}
            <Footer />
        </div>
    )
}