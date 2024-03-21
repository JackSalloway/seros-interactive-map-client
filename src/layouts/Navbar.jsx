import { useEffect } from "react";
// React Router imports
import {
    Outlet,
    useLoaderData,
    useOutletContext,
    useLocation,
    useNavigate,
    useMatches,
} from "react-router-dom";

import HeaderBar from "../Components/HeaderBar/HeaderBar";

const Navbar = () => {
    const userData = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();

    // Get data values from login component (user values)
    let matches = useMatches();

    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data)[0];

    // Redirect user to login screen if no cookies have been detected
    useEffect(() => {
        if (
            user === "No cookies detected, please login to view this page." &&
            location.pathname !== "/"
        ) {
            navigate("/");
        }
    }, [user, location, navigate]);

    // Redirect user to dashboard if the cookies have their user data stored
    useEffect(() => {
        if (user.userId && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [user, location, navigate]);

    return (
        <>
            <HeaderBar user={user} location={location} />

            <main>
                <Outlet context={userData} />
            </main>
        </>
    );
};

export function useUserData() {
    return useOutletContext();
}

export default Navbar;
