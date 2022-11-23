import React, { useState, useEffect } from "react";
import CreateCampaign from "./CreateCampaign";
import CampaignSettings from "./CampaignSettings";
import "./DashboardJournal.css";

const DashboardJournal = (props) => {
    const {
        userAuthenticated,
        setUserAuthenticated,
        renderCampaignForm,
        setRenderCampaignForm,
        renderCampaignSettings,
        setRenderCampaignSettings,
        dataNotifications,
        setDataNotifications,
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

    if (renderCampaignSettings !== null) {
        return (
            <CampaignSettings
                renderCampaignSettings={renderCampaignSettings}
                setRenderCampaignSettings={setRenderCampaignSettings}
            />
        );
    }

    if (renderCampaignForm) {
        return (
            <div className="dashboard-journal-wrapper">
                <CreateCampaign
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                    setRenderCampaignForm={setRenderCampaignForm}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
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
