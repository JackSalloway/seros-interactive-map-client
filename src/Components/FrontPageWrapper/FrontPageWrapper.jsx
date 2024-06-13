import React from "react";
import he from "he";
import "./FrontPageWrapper.css";

const FrontPageWrapper = ({
    campaign,
    journalOpen,
    setJournalOpen,
    setSelectedTab,
}) => {
    return (
        <div id="journal-front-page-wrapper">
            <h2>{he.decode(campaign.name)}</h2>
            <p>Select a tab or location to begin!</p>
            <button
                onClick={() => {
                    setJournalOpen(false);
                    setSelectedTab("");
                }}
            >
                close journal
            </button>
        </div>
    );
};

export default FrontPageWrapper;
