import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

import "./CreateCampaignBannerForm.css";

const CreateCampaignBannerForm = (props) => {
    const {
        userAuthenticated,
        // dataNotifications,
        // setDataNotifications,
        setRenderCreateCampaignBannerForm,
    } = props;

    // State to increase siz scale for banner
    const [scale, setScale] = useState(1);

    // Campaign input values states
    const [newCampaignName, setNewCampaignName] = useState("");
    const [newCampaignDescription, setNewCampaignDescription] = useState("");
    const [disableCreateCampaignButton, setDisableCreateCampaignButton] =
        useState(true);

    const navigate = useNavigate();

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
            campaign_desc: newCampaignDescription,
            username: userAuthenticated.username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(campaignData),
            mode: "cors",
            credentials: "include",
        };

        await fetch(`${process.env.REACT_APP_API_URL}/create_campaign`, init);
        navigate(0); // Used to refresh the page so the user values are updated

        // Old code used to update the campaign value of the user object without refreshing the page
        // I would like to use this, but am unsure how to update the loader value that it uses
        // The loader value comes from the Navbar component

        // const returnedData = await result.json();
        // const userCopy = userAuthenticated;
        // userCopy.campaigns = returnedData.campaigns;
        // setUserAuthenticated({ ...userCopy });
        // const notificationsCopy = dataNotifications;
        // notificationsCopy.push({
        //     message: `Campaign: ${newCampaignName} successfully created!`,
        //     important: false,
        // });
        // setDataNotifications([...notificationsCopy]);
        // setRenderCreateCampaignBannerForm(false);
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
