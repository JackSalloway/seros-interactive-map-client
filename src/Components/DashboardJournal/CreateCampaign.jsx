import React, { useState } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import "./CreateCampaign.css";

const CreateCampaign = (props) => {
    const { userAuthenticated, setUserAuthenticated, setRenderCampaignForm } =
        props;

    const [newCampaignName, setNewCampaignName] = useState("");
    const [newCampaignDescription, setNewCampaignDescription] = useState("");

    // Send POST request to create a new Campaign with this user assigned as admin for it
    const postCampaignData = async (e) => {
        e.preventDefault();

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

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_campaign`,
            init
        );
        const returnedData = await result.json();
        // console.log(returnedData);
        // console.log(userAuthenticated);
        const userCopy = userAuthenticated;
        userCopy.campaigns = returnedData.campaigns;
        console.log(userCopy);
        setUserAuthenticated({ ...userCopy });
        // setUserAuthenticated(returnedData);
    };

    // Send POST request to create a new NPC at this location
    // const postNPCData = async (e) => {

    //     setSerosNPCs([...serosNPCs, ...returnedData]);
    //     const notificationsCopy = dataNotifications;
    //     notificationsCopy.push({
    //         message: `NPC: ${newNPCName}, successfully created!`,
    //         important: false,
    //     });
    //     setDataNotifications(notificationsCopy);
    //     setAddNewNPC(false);
    // };

    return (
        <>
            <p id="create-campaign-notice">
                Currently campaigns can only display a static image. This is due
                to server restraints.
            </p>
            <form onSubmit={postCampaignData} id="create-campaign-form">
                <fieldset id="create-campaign-form">
                    <legend>Create a Campaign!</legend>
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
                    <label htmlFor="campaign-form-description">
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
                <button>Create Campaign!</button>
            </form>
            <button onClick={() => setRenderCampaignForm(false)}>
                Cancel Campaign Creation
            </button>
        </>
    );
};

export default CreateCampaign;
