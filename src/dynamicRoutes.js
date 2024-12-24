import Categories from "./Categories";
import Cart from "./Cart";
import Home from "./Home";

const routes = [
    {
        path: '',
        children: [
            {path: 'homel1', component: () => <div>Home L1</div>},
            {path: 'homel2', component: () => <div>Home L2</div>}
        ],
        component: Home

    },
    {
        path: 'categories',
        children: [
            { path: 'categoriesl1', component: () => <div>categories L1</div> },
            { path: 'categoriesl2', component: () => <div>categories L2</div> }
        ],
        component: Categories
    },
    {
        path: 'cart',
        children: [
            { path: 'cartl1', component: () => <div>Cart L1</div>},
            { path: 'cartl2', component: () => <div>Cart L2</div>}
        ],
        component: Cart
    },
]

export default routes;
