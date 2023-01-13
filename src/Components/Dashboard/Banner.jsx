import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";

// Components
import CampaignSettingsWrapper from "./CampaignSettingsWrapper";

// Styles
import "./Banner.css";

const Banner = (props) => {
    const {
        name,
        description,
        campaignID,
        setCampaign,
        adminRights,
        renderCampaignForm,
    } = props;

    // Scale sizing state values
    const [scale, setScale] = useState(1);

    // Campaign settings state values
    const [renderCampaignSettings, setRenderCampaignSettings] = useState(false);

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
                {adminRights === true ? (
                    <div className="dashboard-banner-admin-icons">
                        <FontAwesomeIcon
                            icon="cog"
                            className="banner-fa-icon"
                            style={iconStyles}
                            onClick={() => {
                                if (renderCampaignForm === true) {
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
                            // onClick={() => setDeleteData(subLocation)}
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
                        backgroundImage: `url(./images/Seros_FotE_banner.png)`,
                    }}
                >
                    <button
                        onClick={() => {
                            setCampaign({ name, description, id: campaignID });
                        }}
                    >
                        Select campaign!
                    </button>
                </div>
                {renderCampaignSettings === true ? (
                    <CampaignSettingsWrapper campaignID={campaignID} />
                ) : null}
            </div>
        </div>
    );
};

export default Banner;
