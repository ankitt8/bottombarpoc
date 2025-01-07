import {browserHistory, Router, Route, IndexRoute} from "react-router";
import React, {useEffect} from "react";
import App from "./App";
import './style.css';

const Home = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Home L0';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Home Tab</div>
        <button onClick={() => navigate('/l1')}>Go to L1</button>
    </div>
};

const HomeL1 = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Home L1';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Home - L1 Page</div>
        <button onClick={() => navigate('/l2')}>Go to L2</button>
    </div>
};

const HomeL2 = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Home L2';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Home - L2 Page</div>
        <button onClick={() => navigate('/l3')}>Go to L3</button>
    </div>
};

const HomeL3 = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Home L3';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Home - L3 Page</div>
        {/*<button onClick={() => navigate('/')}>Go to Home</button>*/}
    </div>
};

const Categories = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Categories L0';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Categories Tab</div>
        <button onClick={() => navigate('/categories/l1')}>Go to L1</button>
    </div>
};

const CategoriesL1 = ({navigate}) => {
    useEffect(() => {
        document.title = 'Categories L1';
    }, []);
    return <div className="pageHeadingContainer" style={{background: 'red'}}>
        <div className="heading">Categories - L1 Page</div>
        <div style={{display: 'flex'}}>
            <button onClick={() => navigate('/categories/l2')}>Go to L2</button>
            <div style={{marginRight: 20}}></div>
            <button onClick={() => navigate('/categories/l3')}>Go to L3</button>
        </div>

    </div>
};

const CategoriesL2 = ({navigate}) => {
    useEffect(() => {
        document.title = 'Categories L2';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Categories - L2 Page</div>
        {/*<button onClick={() => navigate('/categories')}>Go to Categories</button>*/}
    </div>
};


const CategoriesL3 = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Categories L3';
    }, []);

    return <div className="pageHeadingContainer">
        <div className="heading">Categories - L3 Page</div>
        {/*<button onClick={() => navigate('/categories')}>Go to Categories</button>*/}
    </div>
};

const Cart = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Cart L0';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Cart Tab</div>
        <button onClick={() => navigate('/cart/l1')}>Go to L1</button>
    </div>
};

const CartL1 = ({navigate}) => {
    useEffect(() => {
        document.title = 'Cart L1';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Cart - L1 Page</div>
        <button onClick={() => navigate('/cart/l2')}>Go to L2</button>
    </div>
};

const CartL2 = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Cart L2';
    }, []);
    return <div className="pageHeadingContainer">
        <div className="heading">Cart - L2 Page</div>
        {/*<button onClick={() => navigate('/cart')}>Go to Cart</button>*/}
    </div>
};

const NotFound = () => <div>404 - Page Not Found</div>;

export default function Routes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/l1" component={HomeL1}/>
                <Route path="/l2" component={HomeL2}/>
                <Route path="/l3" component={HomeL3}/>
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
