import { useEffect, useState } from "react";
// React Router imports
import {
    Outlet,
    useLoaderData,
    useOutletContext,
    useLocation,
    useNavigate,
    useMatches,
} from "react-router-dom";

// Socket.io imports
import io from "socket.io-client";

import HeaderBar from "../Components/HeaderBar/HeaderBar";

const socket = io("http://localhost:5000");

const Navbar = () => {
    const userData = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();

    // Get data values from login component (user values)
    let matches = useMatches();
    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data);

    // Socket.io states
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("pong", (data) => {
            console.log(data);
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);

    const sendPing = () => {
        socket.emit("ping");
    };

    // Redirect user to login screen if no cookies have been detected
    useEffect(() => {
        if (
            user[0] ===
                "No cookies detected, please login to view this page." &&
            location.pathname !== "/"
        ) {
            navigate("/");
        }
    }, [user, location, navigate]);

    // Redirect user to dashboard if the cookies have their user data stored
    useEffect(() => {
        if (user[0].userId && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [user, location, navigate]);

    return (
        <>
            <HeaderBar user={user[0]} location={location} />
            <div>
                <p>Connected: {"" + isConnected}</p>
                <p>Last pong: {lastPong || "-"}</p>
                <button onClick={sendPing}>Send ping</button>
            </div>
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
