import React from "react";
import { Router, Route, browserHistory } from 'react-router'
import {generateDynamicRoutes} from "./utility";

import dynamicRoutes from "./dynamicRoutes";
import App from "./App";
export default function Routes () {
    return <Router history={browserHistory}>
        <Route path='/' component={App}>
            {generateDynamicRoutes(dynamicRoutes)}
        </Route>
    </Router>
}
