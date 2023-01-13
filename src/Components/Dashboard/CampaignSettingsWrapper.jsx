import React, { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import dayjs from "dayjs";

// Style imports
import "./CampaignSettingsWrapper.css";

const CampaignSettingsWrapper = (props) => {
    const { campaignID } = props;

    const [campaignSettings, setCampaignSettings] = useState(null);
    const [invite, setInvite] = useState(null);
    const [campaignUsers, setCampaignUsers] = useState(null);

    useEffect(() => {
        // Fetch campaign settings from backend
        fetch(
            `${process.env.REACT_APP_API_URL}/campaign_settings/?campaign_id=${campaignID}`,
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
    }, [campaignID]);

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
        <div className="dashboard-banner-campaign-settings">
            <div>
                <h2>Campaign Settings</h2>
            </div>
            <div>
                <h2>Name:</h2>
                <p>{campaignSettings.name}</p>
            </div>
            <div>
                <h2>Description:</h2>
                <p>{campaignSettings.desc}</p>
            </div>
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
                                {user.campaigns[0].creator === true
                                    ? " - Creator"
                                    : null}
                                {user.campaigns[0].admin === true
                                    ? " - Admin"
                                    : null}
                            </p>
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
        </div>
    );
};

export default CampaignSettingsWrapper;
