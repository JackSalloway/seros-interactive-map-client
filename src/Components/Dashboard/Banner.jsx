import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = (props) => {
    const { name, description, campaignID, setCampaign, adminRights } = props;

    const [scale, setScale] = useState(1);

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
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                {adminRights === true ? (
                    <div className="dashboard-banner-admin-icons">
                        <FontAwesomeIcon
                            icon="pencil"
                            className="journal-fa-icon"
                            // onClick={() => setEditing(true)}
                        />
                        <FontAwesomeIcon
                            icon="trash-can"
                            className="journal-fa-icon"
                            // onClick={() => setDeleteData(subLocation)}
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
            </div>
        </div>
    );
};

export default Banner;
