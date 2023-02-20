import { useEffect } from "react";
// React Router imports
import {
    NavLink,
    Outlet,
    useLoaderData,
    useOutletContext,
    useLocation,
    useNavigate,
} from "react-router-dom";

import HeaderBar from "../Components/HeaderBar/HeaderBar";

const Navbar = () => {
    const userData = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect to set userData to user object if necessary
    useEffect(() => {});

    // Redirect user to login screen if no cookies have been detected
    useEffect(() => {
        if (
            userData ===
                "No cookies detected, please login to view this page." &&
            location.pathname !== "/"
        ) {
            // console.log("epic");
            navigate("/");
        }
    }, [userData, location, navigate]);

    // Redirect user to dashboard screen after they have successfully logged in
    useEffect(() => {
        if (userData.userId && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [userData, location, navigate]);

    return (
        <>
            <header>
                <nav>
                    <h1>test navbar</h1>
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/dashboard"}>About</NavLink>
                </nav>
            </header>

            <main>
                <Outlet context={userData} />
            </main>
        </>

        // <HeaderBar
        //             username={userAuthenticated.username}
        //             setUserAuthenticated={setUserAuthenticated}
        //             campaign={campaign}
        //             setCampaign={setCampaign}
        //             setSerosLocations={setSerosLocations}
        //             setSerosNPCs={setSerosNPCs}
        //             setSerosQuests={setSerosQuests}
        //             setRenderCampaignSettings={setRenderCampaignSettings}
        //             setRenderCreationMarker={setRenderCreationMarker}
        //             setCreationMarkerLatLng={setCreationMarkerLatLng}
        //             setCreationMarkerType={setCreationMarkerType}
        //         />
    );
};

export function useUserData() {
    return useOutletContext();
}

export default Navbar;
