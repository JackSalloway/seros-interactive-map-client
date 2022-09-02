import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
    return (
        <div id="loading-screen">
            <img src="images/SerosLogo2.png" alt="" id="loading-screen-logo" />
            <div className="glowing-circle"></div>
            <h1>Loading your data...</h1>
        </div>
    );
};

export default LoadingScreen;
