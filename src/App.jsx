// Style imports
import "./App.css";

// React-Router imports
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

// Component (page) imports
import Login from "./pages/login-screen/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Campaign from "./pages/campaign/Campaign";

// Error components imports
import GenericError from "./Components/ErrorElements/GenericError";

// Request content type import
import { CONTENT_TYPE_APPLICATION_JSON } from "./imports/imports";

// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp,
    faPlus,
    faTimes,
    faTrashCan,
    faPencil,
    faInfoCircle,
    faCog,
    faRightFromBracket,
    faHouseUser,
    faChartBar,
    faHourglass,
    faUsers,
    faCircleExclamation,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "./layouts/Navbar";

library.add(
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp,
    faPlus,
    faTimes,
    faTrashCan,
    faPencil,
    faInfoCircle,
    faCog,
    faRightFromBracket,
    faHouseUser,
    faChartBar,
    faHourglass,
    faUsers,
    faCircleExclamation,
    faMapLocationDot
); // This is used so font awesome icons can be used globally across the app without having to import font awesome everytime.

// New routes code

// User states

// Matches

// Root route options
// Loader to check users cookies for authorized users values
const startupLoader = async () => {
    // fetch startup route from api
    return fetch(`${process.env.REACT_APP_API_URL}/startup`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
        .then(async (res) => {
            // Check if the user object returned has timed out or there are no cookies present
            if (res.status === 401) {
                const errorMessage = await res.text();
                console.log("Error hit:", errorMessage);
                return errorMessage;
            }
            // Response value is valid, return as loader value
            return await res.json();
        })
        .catch((err) => {
            console.log(err.message);
            return err.message;
        });
};

// Action to refresh the loader state value when a login request is recieved
const loginAction = async ({ request }) => {
    const data = await request.formData();
    const loginUserData = {
        username: data.get("username"),
        password: data.get("password"),
    };
    const init = {
        method: "POST",
        headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
        body: JSON.stringify(loginUserData),
        mode: "cors",
        credentials: "include",
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, init)
        .then((response) => {
            // Unsure if something should be put here, but as it is this just updates the loader value which then causes a re-render
            // if (response.status === 200) {
            //     // return null;
            //     // return redirect("/dashboard");
            // }
        })
        .catch(function (error) {
            console.log(error);
            console.log("error logging in");

            if (error.response.status === 400) {
                console.log("error");
                return null;
            }
            return null;
        });
    console.log(res);
    return null;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            action={loginAction}
            loader={startupLoader}
            element={<Navbar />}
            handle={{
                user: (data) => data,
            }}
            errorElement={<GenericError />}
        >
            <Route index element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/campaign/:campaignId" exact element={<Campaign />} />
        </Route>
    )
);

function App() {
    // console.log(router);
    return <RouterProvider router={router} />;
}

export default App;
