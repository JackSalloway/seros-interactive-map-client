import "./CampaignError.css";
import {
    Link,
    // useMatches
} from "react-router-dom";

const CampaignError = () => {
    // let matches = useMatches();
    // let user = matches
    //     .filter((match) => Boolean(match.handle?.user))
    //     .map((match) => match.data)[0];

    // console.log(user);

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
