import React, { useState, useEffect } from "react";
import CreateCampaign from "./CreateCampaign";
import "./DashboardJournal.css";

const DashboardJournal = (props) => {
    const {
        userAuthenticated,
        setUserAuthenticated,
        renderCampaignForm,
        setRenderCampaignForm,
    } = props;

    const [message, setMessage] = useState("Add a new campaign to begin!");

    useEffect(() => {
        if (userAuthenticated.campaigns.length > 0) {
            setMessage(
                "Select an existing campaign, or add a new one to begin!"
            );
        } else {
            setMessage("Add a new campaign to begin!");
        }
    }, [userAuthenticated]);

    if (renderCampaignForm) {
        return (
            <div className="dashboard-journal-wrapper">
                <CreateCampaign
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                    setRenderCampaignForm={setRenderCampaignForm}
                />
            </div>
        );
    }

    return (
        <div className="dashboard-journal-wrapper">
            welcome to the Seros Project! {message}
        </div>
    );
};

export default DashboardJournal;
