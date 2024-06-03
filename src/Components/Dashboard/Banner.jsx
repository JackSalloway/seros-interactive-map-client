import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";

// Components
import CampaignSettingsWrapper from "./CampaignSettingsWrapper";

// Styles
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = (props) => {
    const {
        name,
        description,
        campaignID,
        adminRights,
        campaign,
        renderCampaignBannerForm,
        userData,
        setUpdateUser,
        campaignIndex,
        dataNotifications,
        setDataNotifications,
        setDeleteData,
    } = props;

    // Scale sizing state values
    const [scale, setScale] = useState(1);

    // Campaign settings state values
    const [renderCampaignSettings, setRenderCampaignSettings] = useState(false);

    // User values - sent in the state value when a user clicks on a campaign
    const user = {
        id: userData.id,
        username: userData.username,
        is_admin: campaign.is_admin,
    };

    const navigate = useNavigate();

    const iconStyles = {
        filter: scale === 1 ? `opacity(20%)` : `opacity(100%)`,
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
                    <h2>{he.decode(name)}</h2>
                    <p>{he.decode(description)}</p>
                </div>
                {adminRights === 1 ? (
                    <div className="dashboard-banner-admin-icons">
                        <FontAwesomeIcon
                            icon="cog"
                            className="banner-fa-icon"
                            style={iconStyles}
                            onClick={() => {
                                if (renderCampaignBannerForm === true) {
                                    alert(
                                        "Finish Creating your campaign first!"
                                    );
                                    return;
                                }
                                setRenderCampaignSettings(true);
                            }}
                        />
                        <FontAwesomeIcon
                            icon="trash-can"
                            className="banner-fa-icon"
                            style={iconStyles}
                            // The following line will be for deleting campaigns, which is something I am not entirely sure I want to add.
                            onClick={() => setDeleteData(campaign)}
                        />
                    </div>
                ) : null}
                {adminRights === false ? (
                    <div className="dashboard-banner-not-admin-icons">
                        <FontAwesomeIcon
                            icon="right-from-bracket"
                            className="banner-fa-icon"
                            style={iconStyles}
                        />
                    </div>
                ) : null}
                <div
                    className="dashboard-banner-image"
                    style={{
                        backgroundImage: `url(/images/Seros_FotE_banner.png)`,
                    }}
                >
                    <button
                        onClick={() => {
                            navigate(`../campaign/${campaignID}`, {
                                state: { campaign, user },
                            });
                        }}
                    >
                        Select campaign!
                    </button>
                </div>
                {renderCampaignSettings === true ? (
                    <CampaignSettingsWrapper
                        campaignID={campaignID}
                        userData={userData}
                        setUpdateUser={setUpdateUser}
                        campaignIndex={campaignIndex}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Banner;
