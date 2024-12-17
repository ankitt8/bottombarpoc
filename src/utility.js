import React from "react";
import { Route } from 'react-router';
function generateDynamicRoutes(routes) {
    return routes.map((route) => {
        return <Route key={route.path} path={route.path} component={route.component}>
            {route?.children?.length > 0 ? generateDynamicRoutes(route.children) : null}
        </Route>
    });
}


export {
    generateDynamicRoutes
}
