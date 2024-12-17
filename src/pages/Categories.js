import React, { useState, useEffect } from 'react';
import routes from "../dynamicRoutes";
import {Link} from "react-router";
import NestedUrls from "../NestedUrls";
const currentUrl = 'categories';
export default  function Categories(props) {
    console.log(props.location);
    console.log(props.history);

    const [lastVisitedCategory, setLastVisitedCategory] = useState(props.location.state?.from);
    useEffect(() => {
        if(lastVisitedCategory) {
            props.history.replace(`${currentUrl}/${lastVisitedCategory}`);
        }
    }, []);
    return <div className={'page'}>
        Categories Page
        <NestedUrls currentUrl={currentUrl}/>
        {props.children}
    </div>
}
