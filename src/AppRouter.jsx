import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./Components/HomePage/HomePage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/interactive-map" element={App()} />
                {/* <Route path='/login' element={LoginPage()} /> */}
                <Route path="/" element={HomePage()} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
