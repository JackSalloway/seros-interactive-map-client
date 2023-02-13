import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// disabled React.StrictMode as is caused issues due to calling routes twice through useEffects
// The issue mentioned above is the application calls the startup route twice when it loads. Still not sure why it does this, but have enabled strict mode for reasons mentioned below

// root.render(<App />);

// Re-enabled React.StrictMode to try and implement React-Router
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// if (module.hot) {
//     module.hot.accept();
// }
