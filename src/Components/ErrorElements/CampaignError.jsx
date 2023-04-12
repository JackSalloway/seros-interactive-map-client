import "./CampaignError.css";
import { Link } from "react-router-dom";

const CampaignError = () => {
    return (
        <div id="campaign-error-element-wrapper">
            <h2>Oops!</h2>
            <p>There was an error whilst trying to load this campaign...</p>
            <p>
                Please return to the <Link to={"/dashboard"}>dashboard</Link>{" "}
                and try selecting a campaign from there.
            </p>
        </div>
    );
};

export default CampaignError;
