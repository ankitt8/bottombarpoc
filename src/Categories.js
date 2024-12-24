import React from "react";
import { Routes, Route } from "react-router";

const CategoriesLevel1 = ({ navigate }) => (
    <div>
        <h2>This is Categories Level 1</h2>
        <button onClick={() => navigate("categories", "l2")}>Go to Categories Level 2</button>
        <button onClick={() => navigate("categories")}>Back to Categories</button>
    </div>
);

const CategoriesLevel2 = ({ navigate }) => (
    <div>
        <h2>This is Categories Level 2</h2>
        <button onClick={() => navigate("categories", "l1")}>Back to Categories Level 1</button>
    </div>
);

const Categories = ({ navigate }) => {
    return (
        <Routes>
            <Route path="/" element={<h1>This is Categories</h1>} />
            <Route path="/l1" element={<CategoriesLevel1 navigate={navigate} />} />
            <Route path="/l2" element={<CategoriesLevel2 navigate={navigate} />} />
        </Routes>
    );
};

export default Categories;
