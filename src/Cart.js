import React from "react";
import { Routes, Route } from "react-router";

const CartLevel1 = ({ navigate }) => (
    <div>
        <h2>This is Cart Level 1</h2>
        <button onClick={() => navigate("cart", "l2")}>Go to Cart Level 2</button>
        <button onClick={() => navigate("cart")}>Back to Cart</button>
    </div>
);

const CartLevel2 = ({ navigate }) => (
    <div>
        <h2>This is Cart Level 2</h2>
        <button onClick={() => navigate("cart", "l1")}>Back to Cart Level 1</button>
    </div>
);

const Cart = ({ navigate }) => {
    return (
        <Routes>
            <Route path="/" element={<h1>This is Cart</h1>} />
            <Route path="/l1" element={<CartLevel1 navigate={navigate} />} />
            <Route path="/l2" element={<CartLevel2 navigate={navigate} />} />
        </Routes>
    );
};

export default Cart;
