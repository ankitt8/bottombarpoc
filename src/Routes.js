import {browserHistory, Router, Route, IndexRoute} from "react-router";
import React from "react";
import App from "./App";

const Home = ({ navigate }) => (
    <div>
        <h1>Home Tab</h1>
        <button onClick={() => navigate('/l1')}>Go to L1</button>
    </div>
);

const HomeL1 = ({ navigate }) => (
    <div>
        <h1>Home - L1 Page</h1>
        <button onClick={() => navigate('/l2')}>Go to L2</button>
    </div>
);

const HomeL2 = ({ navigate }) => (
    <div>
        <h1>Home - L2 Page</h1>
        <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
);

const Categories = ({ navigate }) => (
    <div>
        <h1>Categories Tab</h1>
        <button onClick={() => navigate('/categories/l1')}>Go to L1</button>
    </div>
);

const CategoriesL1 = ({ navigate }) => (
    <div>
        <h1>Categories - L1 Page</h1>
        <button onClick={() => navigate('/categories/l2')}>Go to L2</button>
        <button onClick={() => navigate('/categories/l3')}>Go to L3</button>
    </div>
);

const CategoriesL2 = ({ navigate }) => (
    <div>
        <h1>Categories - L2 Page</h1>
        <button onClick={() => navigate('/categories')}>Go to Categories</button>
    </div>
);


const CategoriesL3 = ({ navigate }) => (
    <div>
        <h1>Categories - L3 Page</h1>
        <button onClick={() => navigate('/categories')}>Go to Categories</button>
    </div>
);

const Cart = ({ navigate }) => (
    <div>
        <h1>Cart Tab</h1>
        <button onClick={() => navigate('/cart/l1')}>Go to L1</button>
    </div>
);

const CartL1 = ({ navigate }) => (
    <div>
        <h1>Cart - L1 Page</h1>
        <button onClick={() => navigate('/cart/l2')}>Go to L2</button>
    </div>
);

const CartL2 = ({ navigate }) => (
    <div>
        <h1>Cart - L2 Page</h1>
        <button onClick={() => navigate('/cart')}>Go to Cart</button>
    </div>
);

const NotFound = () => <h1>404 - Page Not Found</h1>;

export default function Routes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/l1" component={HomeL1}/>
                <Route path="/l2" component={HomeL2}/>
                <Route path="/categories" component={Categories}/>
                <Route path="/categories/l1" component={CategoriesL1}/>
                <Route path="/categories/l2" component={CategoriesL2}/>
                <Route path="/categories/l3" component={CategoriesL3}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/cart/l1" component={CartL1}/>
                <Route path="/cart/l2" component={CartL2}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    );
}
