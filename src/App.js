import React from "react";
import BottomBar from "./components/BottomBar";
function App(props) {
    return <>
        {props?.children ? props?.children : null}
        <BottomBar props={props}/>
    </>
}
export default  App;
