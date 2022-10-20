import React from "react";

const Dashboard = (props) => {
    // Plan is to render out multiple banners that display the name, description and a portion of the image (styled somehow).
    // The user can then click a button on these banners to select that campaign.
    // Campaigns will be stored in the user data (currenty userAuthenticated state value) as an array of strings that will link to relevant campaign documents
    // Users can make new campaigns, or join one that is already created via referal from a friend (or of a similar sort.)

    const { campaigns, setCampaign } = props;

    // console.log(campaigns);

    const campaignSelectBanner = (name, description) => {
        return (
            <div>
                <p>Campaign Name: {name}</p>
                <p>Campaign Description: {description}</p>
            </div>
        );
    };

    const createCampaignBanner = () => {
        return <div>Create a new Campaign!</div>;
    };

    return (
        <div>
            {campaigns.length > 0
                ? campaigns.map((campaign) => {
                      console.log(campaign);
                      return campaignSelectBanner(
                          campaign.campaign.name,
                          campaign.campaign.desc
                      );
                  })
                : null}
            {createCampaignBanner()}
        </div>
    );
    // createCampaignBanner();
};

export default Dashboard;
