import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import "./layout.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddcss = false;

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