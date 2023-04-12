import { useMatches } from "react-router-dom";

import DashboardWrapper from "../../Components/Dashboard/DashboardWrapper";

const Dashboard = () => {
    // Retrieve user data from user handle
    let matches = useMatches();
    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data)[0];

    return (
        <DashboardWrapper userAuthenticated={user} campaigns={user.campaigns} />
    );
};

export default Dashboard;
