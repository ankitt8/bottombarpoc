import React from "react";
import {Link} from "react-router";
const bottomBarConfig = [
    {name: 'Home', path: '/'},
    {name: 'Categories', path: '/categories'},
    {name: 'Cart', path: '/cart'}
]
export default function BottomBar(props) {
    // const currentPath = props.location.pathname;
    const currentPath = window.location.pathname;
    return <div className={'bottomBarContainer'}>
        <div className={'bottomBar'}>
            {bottomBarConfig.map((el) => {
                return <Link
                    key={el.path}
                    to={{pathname: `${el.path}`, state: { from: currentPath }}}
                >
                    {el.name}

                </Link>
            })}
        </div>

    </div>
}
