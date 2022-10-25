import React, { useState, useEffect } from "react";

const CampaignSettings = (props) => {
    const { renderCampaignSettings, setRenderCampaignSettings } = props;

    const [campaignSettings, setCampaignSettings] = useState(null);

    useEffect(() => {
        // Fetch campaign settings from backend
        fetch(
            `${process.env.REACT_APP_API_URL}/campaign_settings/?campaign_id=${renderCampaignSettings}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then((res) => res.json())
            .then((data) => setCampaignSettings(data[0]));
    }, [renderCampaignSettings]);

    if (campaignSettings === null) {
        return <h2>Loading Campaign Settings...</h2>;
    }

    return (
        <div>
            <h2>Campaign Settings</h2>
            <h2>{campaignSettings.name}</h2>
            <h2>{campaignSettings.desc}</h2>
            <button
                onClick={() => {
                    setRenderCampaignSettings(null);
                }}
            >
                Close Settings
            </button>
        </div>
    );
};

export default CampaignSettings;
