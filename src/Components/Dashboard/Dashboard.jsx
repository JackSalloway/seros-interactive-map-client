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

    // console.log(campaigns);

    // const campaignSelectBanner = (name, description, campaignID) => {
    //     return (
    //         <div
    //             className="dashboard-banner"
    //             onMouseEnter={() => {
    //                 setScale(1.01);
    //             }}
    //             onMouseLeave={() => {
    //                 setScale(1);
    //             }}
    //             style={{ transform: `scale(${scale})` }}
    //         >
    //             <div className="dashboard-banner-text">
    //                 <h2>{name}</h2>
    //                 <p>{description}</p>
    //             </div>
    //             <div
    //                 className="dashboard-banner-image"
    //                 style={{
    //                     backgroundImage: `url(./images/Seros_FotE_banner.png)`,
    //                 }}
    //             >
    //                 <button
    //                     onClick={() => {
    //                         setCampaign(campaignID);
    //                     }}
    //                 >
    //                     Select campaign!
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // };

    const loginPrompt = () => {
        return (
            <div id="dashboard-login-prompt">
                <h2>Login to begin your adventure!</h2>
            </div>
        );
    };

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
                      //   console.log(campaign);
                      //   return campaignSelectBanner(
                      //       campaign.campaign.name,
                      //       campaign.campaign.desc,
                      //       campaign.campaign._id
                      //   );
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
            {userAuthenticated.username === undefined
                ? loginPrompt() // Feel like there is a better way of doing this
                : createCampaignBanner()}
        </div>
    );
    // createCampaignBanner();
};

export default Dashboard;
