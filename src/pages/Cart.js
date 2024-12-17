import React from 'react';
import routes from "../dynamicRoutes";
import {Link} from "react-router";
const currentUrl = 'cart';
import NestedUrls from "../NestedUrls";
export default  function Cart(props) {
    return <div className={'page'}>
        <div>Cart Page</div>


            <NestedUrls currentUrl={currentUrl}/>


        {props.children}
    </div>
}
