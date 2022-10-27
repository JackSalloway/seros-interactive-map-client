import React, { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import dayjs from "dayjs";
import "./CampaignSettings.css";

const CampaignSettings = (props) => {
    const { renderCampaignSettings, setRenderCampaignSettings } = props;

    const [campaignSettings, setCampaignSettings] = useState(null);
    const [invite, setInvite] = useState(null);
    const [campaignUsers, setCampaignUsers] = useState(null);

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
            .then((data) => {
                console.log(data);
                setCampaignSettings(data.campaign[0]);
                setInvite(data.invite[0]); // If there is no invite code found, data.invite[0] === undefined
                setCampaignUsers(data.campaignUsers);
            });
    }, [renderCampaignSettings]);

    const createInviteCode = () => {
        console.log("creating invite code");
        console.log(campaignSettings);
        fetch(`${process.env.REACT_APP_API_URL}/campaign_generate_code/`, {
            method: "PUT",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify({ campaign_id: campaignSettings._id }),
            mode: "cors",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((inviteCode) => {
                console.log(inviteCode);
                setInvite(inviteCode[0]);
            });
    };

    if (campaignSettings === null) {
        return <h2>Loading Campaign Settings...</h2>;
    }

    return (
        <div className="campaign-settings-wrapper">
            <h2>Campaign Settings</h2>
            <h2>Name: {campaignSettings.name}</h2>
            <h2>Description: {campaignSettings.desc}</h2>
            <div>
                <h2>Users:</h2>
                {campaignUsers.map((user) => {
                    return (
                        <div
                            key={user._id}
                            className="campaign-settings-single-user-wrapper"
                        >
                            <p>
                                {user.username}

                                {user.campaigns[0].admin === true
                                    ? " - Admin"
                                    : null}
                            </p>
                            <p></p>
                        </div>
                    );
                })}
            </div>
            {invite === undefined ? (
                <button
                    onClick={() => {
                        createInviteCode();
                    }}
                >
                    Generate an invite code!
                </button>
            ) : (
                <>
                    <h2>Invite Code: {invite.code}</h2>
                    <h2>
                        Time Created:{" "}
                        {dayjs(invite.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </h2>
                </>
            )}
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
