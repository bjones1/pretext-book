import React from "react";
import { ElementBook } from "../../../assets/generated-types";
import { PretextStateContext } from "../state";
import { toString } from "xast-util-to-string";
import { ReplacerComponentWithId } from "../replacers/replacer-factory";

export const Article: ReplacerComponentWithId = function ({ node: _node, id }) {
    const node = _node as ElementBook;

    const titleElement = node.children.find(
        (e) => e.type === "element" && e.name === "title"
    );
    const titleChildren = titleElement?.children || [];
    const titleString = toString({
        type: "element",
        name: "",
        children: titleChildren,
    }).trim();

    return (
        <html>
            <head>
                <title>{titleString}</title>
                {[
                    "pretext",
                    "pretext_add_on",
                    "shell_default",
                    "banner_default",
                    "navbar_default",
                    "toc_default",
                    "knowls_default",
                    "style_default",
                    "colors_blue_red",
                    "setcolors",
                ].map((n) => (
                    <link
                        key={n}
                        href={`https://pretextbook.org/css/0.6/${n}.css`}
                        rel="stylesheet"
                        type="text/css"
                    />
                ))}
            </head>
            <body className="pretext book">
                <div className="ptx-page">
                    <div className="ptx-sidebar" />
                    <ArticlePtxMain node={node} id={id} />
                </div>
            </body>
        </html>
    );
};

export const ArticlePtxMain: ReplacerComponentWithId = function ({
    node: _node,
    id,
}) {
    const state = React.useContext(PretextStateContext);
    const node = _node as ElementBook;

    const rest = node.children.filter(
        (n) =>
            !["title", "shorttitle", "subtitle", "plaintitle"].includes(n.name)
    );

    return (
        <main className="ptx-main">
            <div id="ptx-content" className="ptx-content">
                <section id={id} className="article">
                    {state.processContent(rest)}
                </section>
            </div>
            <div className="ptx-page-footer" />
        </main>
    );
};
