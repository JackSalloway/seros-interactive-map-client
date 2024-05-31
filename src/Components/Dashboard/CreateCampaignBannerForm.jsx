import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

import "./CreateCampaignBannerForm.css";

const CreateCampaignBannerForm = (props) => {
    const {
        dataNotifications,
        setDataNotifications,
        setRenderCreateCampaignBannerForm,
        userData,
        setUserData,
    } = props;

    // State to increase siz scale for banner
    const [scale, setScale] = useState(1);

    // Campaign input values states
    const [newCampaignName, setNewCampaignName] = useState("");
    const [newCampaignDescription, setNewCampaignDescription] = useState("");
    const [disableCreateCampaignButton, setDisableCreateCampaignButton] =
        useState(true);

    // Effect to enable create campaign button when inputs are valid
    useEffect(() => {
        if (newCampaignName !== "" && newCampaignDescription !== "") {
            setDisableCreateCampaignButton(false);
            return;
        }
        setDisableCreateCampaignButton(true);
    }, [newCampaignName, newCampaignDescription]);

    // Send POST request to create a new Campaign with this user assigned as admin for it
    const postCampaignData = async (e) => {
        const campaignData = {
            campaign_name: newCampaignName,
            campaign_description: newCampaignDescription,
            username: userData.username,
            user_id: userData.id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(campaignData),
            mode: "cors",
            credentials: "include",
        };

        // Send request to create a new campaign
        const req = await fetch(
            `${process.env.REACT_APP_API_URL}/create_campaign`,
            init
        );
        const result = await req.json();

        // Update the campaign array in the userData state
        const userDataCopy = userData;
        userData.campaigns = result.campaigns;
        setUserData({ ...userDataCopy });

        // Add a data notificaiton showing that the new campaign has been successfully created
        const newNotification = {
            message: `Campaign: ${newCampaignName} successfully created!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Unmount form component
        setRenderCreateCampaignBannerForm(false);
    };

    return (
        <div>
            <div
                className="dashboard-banner"
                onMouseEnter={() => {
                    setScale(1.01);
                }}
                onMouseLeave={() => {
                    setScale(1);
                }}
                style={{ transform: `scale(${scale})` }}
            >
                <div className="dashboard-banner-text">
                    <form>
                        <fieldset id="create-campaign-form">
                            <legend>Create a campaign!</legend>
                            <label htmlFor="campaign-form-name">
                                Campaign Name
                                <input
                                    type="text"
                                    id="campaign-form-name"
                                    required
                                    value={newCampaignName}
                                    onChange={({ target }) => {
                                        setNewCampaignName(target.value);
                                    }}
                                />
                            </label>
                            <label htmlFor="campaign-form-name">
                                Campaign Description
                                <textarea
                                    type="text"
                                    id="campaign-form-description"
                                    required
                                    value={newCampaignDescription}
                                    onChange={({ target }) => {
                                        setNewCampaignDescription(target.value);
                                    }}
                                />
                            </label>
                        </fieldset>
                    </form>
                </div>
                <div className="dashboard-banner-image">
                    <button
                        onClick={() => postCampaignData()}
                        disabled={disableCreateCampaignButton}
                    >
                        Create Campaign!
                    </button>
                    <button
                        onClick={() => setRenderCreateCampaignBannerForm(false)}
                    >
                        Cancel Creation!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaignBannerForm;
