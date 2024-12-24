import React from "react";

const Home = ({ navigate }) => {
    return (
        <div>
            <h1>This is Home</h1>
            <button onClick={() => navigate("home", "l1")}>Go to Home Level 1</button>
        </div>
    );
};

export default Home;
