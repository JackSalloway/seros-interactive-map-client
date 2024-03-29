import React, { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import dayjs from "dayjs";
import he from "he";

// Style imports
import "./CampaignSettingsWrapper.css";

const CampaignSettingsWrapper = (props) => {
    const {
        campaignID,
        userAuthenticated,
        setUserAuthenticated,
        campaignIndex,
        dataNotifications,
        setDataNotifications,
    } = props;

    // Campaign data states
    const [campaignSettings, setCampaignSettings] = useState(null);
    const [invite, setInvite] = useState(null);
    const [campaignUsers, setCampaignUsers] = useState(null);

    // Campaign name/description update values states
    const [updatedCampaignName, setUpdatedCampaignName] = useState("");
    const [updatedCampaignDesc, setUpdatedCampaignDesc] = useState("");
    const [disableUpdateCampaignDetails, setDisableUpdateCampaignDetails] =
        useState(true);

    // Campaign user list update values
    const [updatedCampaignUsers, setUpdatedCampaignUsers] = useState([]);

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
                setCampaignSettings(data.campaign[0]);
                setInvite(data.invite[0]); // If there is no invite code found, data.invite[0] === undefined
                setCampaignUsers(data.campaignUsers);
                // Set the campaign update values
                setUpdatedCampaignName(he.decode(data.campaign[0].name));
                setUpdatedCampaignDesc(he.decode(data.campaign[0].desc));
                setUpdatedCampaignUsers(data.campaignUsers);
            });
    }, [campaignID]);

    // Check if either campaign name or description valu has been edited
    useEffect(() => {
        if (campaignSettings === null) return; // This prevents the app from crashing before the data has been retrieved on initial render
        if (
            updatedCampaignName !== campaignSettings.name ||
            updatedCampaignDesc !== campaignSettings.desc
        ) {
            setDisableUpdateCampaignDetails(false);
        } else {
            setDisableUpdateCampaignDetails(true);
        }
    }, [campaignSettings, updatedCampaignName, updatedCampaignDesc]);

    // Update campaign name/description
    const updateCampaignData = async (e) => {
        e.preventDefault();
        const updatedCampaignData = {
            campaign_name: updatedCampaignName,
            campaign_desc: updatedCampaignDesc,
            campaign_id: campaignID,
            username: userAuthenticated.username,
        };
        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(updatedCampaignData),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_campaign`,
            init
        );
        const returnedData = await result.json();
        const userCopy = userAuthenticated;
        userCopy.campaigns[campaignIndex] =
            returnedData.campaigns[campaignIndex];
        setUserAuthenticated({ ...userCopy });
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `Campaign: ${updatedCampaignName} successfully updated!`,
            important: false,
        });
        setDataNotifications([...notificationsCopy]);
    };

    // Create invite code
    const createInviteCode = () => {
        fetch(`${process.env.REACT_APP_API_URL}/campaign_generate_code/`, {
            method: "PUT",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify({ campaign_id: campaignSettings._id }),
            mode: "cors",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((inviteCode) => {
                setInvite(inviteCode[0]);
            });
    };

    if (campaignSettings === null) {
        return <h2>Loading Campaign Settings...</h2>;
    }

    return (
        <div className="dashboard-banner-campaign-settings-wrapper">
            <div className="dashboard-banner-campaign-settings-title-wrapper">
                <h2>Campaign Settings</h2>
            </div>
            <div className="dashboard-banner-campaign-settings-details-wrapper">
                <form onSubmit={updateCampaignData}>
                    <div className="dashboard-banner-campaign-settings-details-name-wrapper">
                        <label
                            htmlFor={`update-campaign-${campaignID}-name-input`}
                        >
                            Name:
                        </label>
                        <input
                            id={`update-campaign-${campaignID}-name-input`}
                            type="text"
                            value={updatedCampaignName}
                            onChange={({ target }) => {
                                setUpdatedCampaignName(target.value);
                            }}
                        />
                    </div>
                    <div className="dashboard-banner-campaign-settings-details-description-wrapper">
                        <label
                            htmlFor={`update-campaign-${campaignID}-description-input`}
                        >
                            Description:
                        </label>
                        <textarea
                            id={`update-campaign-${campaignID}-description-input`}
                            type="text"
                            value={updatedCampaignDesc}
                            onChange={({ target }) => {
                                setUpdatedCampaignDesc(target.value);
                            }}
                        />
                    </div>
                    <div className="dashboard-banner-campaign-settings-details-button-wrapper">
                        <button disabled={disableUpdateCampaignDetails}>
                            Update Details!
                        </button>
                    </div>
                </form>
            </div>
            <div className="dashboard-banner-campaign-settings-users-wrapper">
                <h2>Users:</h2>
                {campaignUsers.map((user) => {
                    return (
                        <div
                            key={user._id}
                            className="dashboard-banner-campaign-settings-users-single-user-wrapper"
                        >
                            <p>
                                {user.username}
                                {user.campaigns[0].creator === true
                                    ? " - Creator"
                                    : null}
                                {user.campaigns[0].admin === true &&
                                user.campaigns[0].creator === false
                                    ? " - Admin"
                                    : null}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="dashboard-banner-campaign-settings-invite-code-wrapper">
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
                            {dayjs(invite.created_at).format(
                                "DD/MM/YYYY HH:mm:ss"
                            )}
                        </h2>
                    </>
                )}
            </div>
        </div>
    );
};

export default CampaignSettingsWrapper;
