import React from "react";
import he from "he";
import "./FrontPageWrapper.css";

const FrontPageWrapper = ({ campaign }) => {
    return (
        <div id="journal-front-page-wrapper">
            <h2>{he.decode(campaign.campaign_name)}</h2>
            <p>Select a tab or location to begin!</p>
        </div>
    );
};

export default FrontPageWrapper;
