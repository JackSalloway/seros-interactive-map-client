import React, { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import he from "he";

// Style imports
import "./CampaignSettingsWrapper.css";

const CampaignSettingsWrapper = (props) => {
    const {
        campaignID,
        userData,
        setUpdateUser,
        dataNotifications,
        setDataNotifications,
        setRenderCampaignSettings,
    } = props;

    // Campaign data states
    const [campaignSettings, setCampaignSettings] = useState(null);
    const [invite, setInvite] = useState(null);
    const [campaignUsers, setCampaignUsers] = useState(null);

    // Campaign name/description update values states
    const [updatedCampaignName, setUpdatedCampaignName] = useState("");
    const [updatedCampaignDescription, setUpdatedCampaignDescription] =
        useState("");
    const [disableUpdateCampaignDetails, setDisableUpdateCampaignDetails] =
        useState(true);

    useEffect(() => {
        // Fetch campaign settings from backend
        const fetchData = async () => {
            try {
                // Send request to fetch campaign settings data
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/campaign_settings/?campaign_id=${campaignID}`,
                    {
                        method: "GET",
                        mode: "cors",
                    }
                );
                const result = await res.json();
                setCampaignSettings(result.campaign);
                setInvite(result.invite);
                setCampaignUsers(result.campaignUsers);
                setUpdatedCampaignName(he.decode(result.campaign.name));
                setUpdatedCampaignDescription(
                    he.decode(result.campaign.description)
                );
            } catch (err) {
                console.error("Error fetching campaign data:", err);
            }
        };

        fetchData();
    }, [campaignID]);

    // Check if either campaign name or description value has been edited
    useEffect(() => {
        if (campaignSettings === null) return; // This prevents the app from crashing before the data has been retrieved on initial render
        if (
            updatedCampaignName !== campaignSettings.name ||
            updatedCampaignDescription !== campaignSettings.desc
        ) {
            setDisableUpdateCampaignDetails(false);
        } else {
            setDisableUpdateCampaignDetails(true);
        }
    }, [campaignSettings, updatedCampaignName, updatedCampaignDescription]);

    // Update campaign name/description
    const updateCampaignData = async (e) => {
        e.preventDefault();
        const updatedCampaignData = {
            campaign_name: updatedCampaignName,
            campaign_description: updatedCampaignDescription,
            campaign_id: campaignID,
            username: userData.username,
        };
        const init = {
            method: "PUT",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(updatedCampaignData),
            mode: "cors",
            credentials: "include",
        };
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/update_campaign`,
            init
        );
        // const result = await res.json();

        // console.log(result);

        // Update the updateUser state value
        setUpdateUser(true);

        // Add a data notification showing that the campaign has been updated
        const newNotification = {
            message: `Campaign: ${updatedCampaignName} successfully updated!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);
    };

    // Create invite code
    const createInviteCode = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/campaign_generate_code/`,
            {
                method: "PUT",
                headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
                body: JSON.stringify({ campaign_id: campaignID }),
                mode: "cors",
                credentials: "include",
            }
        );
        const result = await res.json();
        setInvite(result);
    };

    if (campaignSettings === null) {
        return <h2>Loading Campaign Settings...</h2>;
    }

    return (
        <div className="dashboard-banner-campaign-settings-wrapper">
            <div className="dashboard-banner-campaign-settings-title-wrapper">
                <FontAwesomeIcon
                    icon="fa-times"
                    className="dashboard-settings-admin-icons location-notes-fa-cross"
                    onClick={() => {
                        setRenderCampaignSettings(false);
                    }}
                />
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
                            value={updatedCampaignDescription}
                            onChange={({ target }) => {
                                setUpdatedCampaignDescription(target.value);
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
                            key={user.id}
                            className="dashboard-banner-campaign-settings-users-single-user-wrapper"
                        >
                            <p>
                                {user.username}
                                {user.is_admin === 1 ? " - Admin" : null}
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
                        <h2>Share this code with your friends!</h2>
                        <h2>Invite Code: {invite.code}</h2>
                        <h2>
                            Create at:{" "}
                            {dayjs(invite.created_at).format(
                                "DD/MM/YYYY HH:mm:ss"
                            )}
                        </h2>
                        <h2>
                            expires at:{" "}
                            {dayjs(invite.expires_at).format(
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
