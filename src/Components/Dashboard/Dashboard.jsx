import React, { useState } from "react";
import "./Dashboard.css";
import Banner from "./Banner";

const Dashboard = (props) => {
    // Plan is to render out multiple banners that display the name, description and a portion of the image (styled somehow).
    // The user can then click a button on these banners to select that campaign.
    // Campaigns will be stored in the user data (currenty userAuthenticated state value) as an array of strings that will link to relevant campaign documents
    // Users can make new campaigns, or join one that is already created via referal from a friend (or of a similar sort.)

    const { userAuthenticated, campaigns, setCampaign } = props;

    const [scale, setScale] = useState(1);

    const createCampaignBanner = () => {
        return (
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
                    <h2>Add a new campaign!</h2>
                    <p>Begin logging your adventures...</p>
                </div>
                <div className="dashboard-banner-image">
                    <button>Add new Campaign!</button>
                </div>
            </div>
        );
    };

    return (
        <div>
            {campaigns.length > 0
                ? campaigns.map((campaign) => {
                      return (
                          <Banner
                              key={campaign.campaign._id}
                              name={campaign.campaign.name}
                              description={campaign.campaign.desc}
                              campaignID={campaign.campaign._id}
                              setCampaign={setCampaign}
                          />
                      );
                  })
                : null}
            {createCampaignBanner()}
        </div>
    );
    // createCampaignBanner();
};

export default Dashboard;
