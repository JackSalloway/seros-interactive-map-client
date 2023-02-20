import React from "react";

import { useUserData } from "../layouts/Navbar";

const Dashboard = () => {
    const userData = useUserData();
    return <h1>Hello {userData.username}</h1>;
};

export default Dashboard;
