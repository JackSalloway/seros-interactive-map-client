import React, { useState } from "react";

const Banner = (props) => {
    const { name, description, campaignID, setCampaign } = props;

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
                <div
                    className="dashboard-banner-image"
                    style={{
                        backgroundImage: `url(./images/Seros_FotE_banner.png)`,
                    }}
                >
                    <button
                        onClick={() => {
                            setCampaign(campaignID);
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
