import React from "react";
import he from "he";
import "./FrontPageWrapper.css";

const FrontPageWrapper = ({ campaign }) => {
    console.log(campaign);

    return (
        <div id="journal-front-page-wrapper">
            <div id="journal-front-page-title">
                <h1>{he.decode(campaign.campaign.name)}</h1>
            </div>
        </div>
    );
};

export default FrontPageWrapper;
