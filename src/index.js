import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import AppRouter from "./AppRouter";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// disabled React.StrictMode as is caused issues due to calling routes twice through useEffects
root.render(<App />);

// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

// if (module.hot) {
//     module.hot.accept();
// }
