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
import PageNotFound from "./pages/page-not-found/PageNotFound";

// Error components imports
import GenericError from "./Components/ErrorElements/GenericError";
import CampaignError from "./Components/ErrorElements/CampaignError";

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

// Root route options
// Loader to check users cookies for authorized users values
const startupLoader = async () => {
    // fetch startup route from api
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/startup`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        });
        if (res.status === 401) {
            const errorMessage = await res.text();
            console.log("Error hit:", errorMessage);
            return errorMessage;
        }
        return await res.json();
    } catch (err) {
        console.log(err);
    }
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

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, init);
        const userData = await res.json();
        return userData;
    } catch (err) {
        console.log(err);
        console.log("error logging in");
        return null;
    }
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
            <Route path="*" element={<PageNotFound />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route
                path="/campaign/:campaignId"
                exact
                element={<Campaign />}
                errorElement={<CampaignError />}
            />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
