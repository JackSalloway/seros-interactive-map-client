import { useMatches, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardWrapper from "../../Components/Dashboard/DashboardWrapper";

const Dashboard = () => {
    // Retrieve user data from user handle
    let matches = useMatches();
    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data)[0];

    const location = useLocation();

    const [userData, setUserData] = useState(user);
    const [updateUser, setUpdateUser] = useState(false);

    // Use effect to fetch user data values on component render, create_campaign, update_campaign, delete_campaign
    useEffect(() => {
        const fetchData = async () => {
            const req = await fetch(
                `${process.env.REACT_APP_API_URL}/startup`,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                }
            );
            if (req.status === 401) {
                const errorMessage = await req.text();
                console.log("Error hit:", errorMessage);
                return errorMessage;
            }
            const res = await req.json();
            setUserData({
                id: res.id,
                username: res.username,
                campaigns: res.campaigns,
            });
        };

        // Only call fetchData if the updateUser state is true or the previous page wasn't the index page (login screen)
        if (updateUser || location.state?.from !== "/") {
            fetchData().catch((err) => console.log(err));
            setUpdateUser(false);
        }
    }, [updateUser, location.state?.from]);

    return (
        <DashboardWrapper userData={userData} setUpdateUser={setUpdateUser} />
    );
};

export default Dashboard;
