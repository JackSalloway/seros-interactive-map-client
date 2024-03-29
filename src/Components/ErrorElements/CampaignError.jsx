import "./CampaignError.css";
import {
    Link,
    // useMatches
} from "react-router-dom";

const CampaignError = () => {
    return (
        <div id="campaign-error-element-wrapper">
            <h2>Oops!</h2>
            <p>
                There was an error whilst trying to load this campaign.
                <br />
                It could be either of the following:
            </p>
            <ul>
                <li>This campaign does not exist.</li>
                <li>You are not a member of this campaign.</li>
            </ul>
            <p>
                Please return to the <Link to={"/dashboard"}>dashboard</Link>{" "}
                and try selecting a campaign from there.
            </p>
        </div>
    );
};

export default CampaignError;
