import routes from "./dynamicRoutes";
import {Link} from "react-router";
import React from "react";

export default function NestedUrls ({currentUrl}) {
    return <div>{routes
        .find((route) => route.path === currentUrl)
        .children.map((child) => <Link key={child.path} className={'link'} to={child.path}>{child.path}</Link>)}
    </div>
}
