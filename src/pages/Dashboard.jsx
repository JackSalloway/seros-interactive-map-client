import { useEffect } from "react";

import { useMatches } from "react-router-dom";

import { useUserData } from "../layouts/Navbar";

const Dashboard = () => {
    let matches = useMatches();
    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data);

    // console.log(user);
    // console.log(matches);

    // Redirect user if no valid user is signed in
    // useEffect(() => {
    //     if
    // })

    const userData = useUserData();
    return <h1>Hello</h1>;
};

export default Dashboard;
