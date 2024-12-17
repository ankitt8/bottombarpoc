import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import styles from './style.css';
import Routes from "./Routes";
const rootElement = document.getElementById('root');
ReactDOM.render(<Routes />,rootElement);
if (module.hot) {
    module.hot.accept('./Routes', () => {
        const Routes = require('./Routes').default;
        ReactDOM.render(<Routes />, rootElement);
    });
}
