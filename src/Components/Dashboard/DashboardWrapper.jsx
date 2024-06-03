import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Banner from "./Banner";
import CreateCampaignBannerForm from "./CreateCampaignBannerForm";
import DataNotification from "../Notifications/DataNotification";
import CampaignDeletionModal from "./CampaignDeletionModal";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = (props) => {
    // Plan is to render out multiple banners that display the name, description and a portion of the image (styled somehow).
    // The user can then click a button on these banners to select that campaign.
    // Campaigns will be stored in the user data (currenty user state value) as an array of strings that will link to relevant campaign documents
    // Users can make new campaigns, or join one that is already created via referal from a friend (or of a similar sort.)

    const { userData, setUpdateUser } = props;

    // State for rendering CreateCampaignBannerForm in place of CreateCampaignBanner
    const [renderCreateCampaignBannerForm, setRenderCreateCampaignBannerForm] =
        useState(false);

    // States for Increasing banner size scales on hover
    const [createCampaignScale, setCreateCampaignScale] = useState(1);
    const [joinCampaignScale, setJoinCampaignScale] = useState(1);

    // States related to invite codes Invite codes
    const [inviteCode, setInviteCode] = useState(""); // Used to update invite code input value
    const [validCode, setValidCode] = useState(false); // Used to enable join campaign button when code is valid

    // State related to dataNotifications
    const [dataNotifications, setDataNotifications] = useState([]);

    // State related to deleting campaigns
    const [deleteData, setDeleteData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const regex = /^[a-z,0-9,-]{36,36}$/; // Not the best regex expression, but will prevent user from spamming join
        setValidCode(regex.test(inviteCode));
    }, [inviteCode]);

    const createCampaignBanner = () => {
        return (
            <div
                className="dashboard-banner"
                onMouseEnter={() => {
                    setCreateCampaignScale(1.01);
                }}
                onMouseLeave={() => {
                    setCreateCampaignScale(1);
                }}
                style={{ transform: `scale(${createCampaignScale})` }}
            >
                <div className="dashboard-banner-text">
                    <h2>Add a new campaign!</h2>
                    <p>Begin logging your adventures...</p>
                </div>
                <div className="dashboard-banner-image">
                    <button
                        onClick={() => {
                            setRenderCreateCampaignBannerForm(true);
                        }}
                    >
                        Add new Campaign!
                    </button>
                </div>
            </div>
        );
    };

    // Function to fire request for user to join a new campaign
    const joinCampaign = async () => {
        const joinCampaignData = {
            username: userData.username,
            invite_code: inviteCode,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(joinCampaignData),
            mode: "cors",
            credentials: "include",
        };

        fetch(`${process.env.REACT_APP_API_URL}/join_campaign`, init)
            .then(async (res) => {
                if (res.status === 400) {
                    const message = await res.text();
                    throw Error(message);
                }
                return res.json();
            })
            .then((returnedData) => {
                navigate(0);

                // Old code used to update the campaign value of the user object without refreshing the page
                // I would like to use this, but am unsure how to update the loader value that it uses
                // The loader value comes from the Navbar component

                // const userCopy = user;
                // userCopy.campaigns = returnedData.campaigns;
                // setUserAuthenticated({ ...userCopy });
                // setInviteCode(""); // Reset the invite code to an empty string
                // const notificationsCopy = dataNotifications;
                // notificationsCopy.push({
                //     message: "New campaign successfully joined!",
                //     important: false,
                // });
                // setDataNotifications([...notificationsCopy]);
            })
            .catch((err) => {
                // const notificationsCopy = dataNotifications;
                // notificationsCopy.push({
                //     message: err.message,
                //     important: true,
                // });
                // setDataNotifications([...notificationsCopy]);
            });
    };

    const joinCampaignBanner = () => {
        return (
            <div
                className="dashboard-banner"
                onMouseEnter={() => {
                    setJoinCampaignScale(1.01);
                }}
                onMouseLeave={() => {
                    setJoinCampaignScale(1);
                }}
                style={{ transform: `scale(${joinCampaignScale})` }}
            >
                <div className="dashboard-banner-text">
                    <h2>Join an existing campaign!</h2>
                    <p>Use an invitation code to join your friends...</p>
                    <input
                        type="text"
                        value={inviteCode}
                        onChange={({ target }) => {
                            setInviteCode(target.value);
                        }}
                    />
                </div>
                <div className="dashboard-banner-image">
                    <button
                        onClick={() => {
                            joinCampaign();
                        }}
                        disabled={!validCode}
                    >
                        Join Campaign!
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div id="dashboard-banner-wrapper">
            {userData.campaigns.length > 0
                ? userData.campaigns.map((campaign, index) => {
                      return (
                          <Banner
                              key={campaign.id}
                              name={campaign.name}
                              description={campaign.description}
                              campaignID={campaign.id}
                              adminRights={campaign.is_admin}
                              campaign={campaign}
                              renderCreateCampaignBannerForm={
                                  renderCreateCampaignBannerForm
                              } // Used to disable campaign settings/deletion buttons if campaign creation form is open
                              userData={userData}
                              setUpdateUser={setUpdateUser}
                              campaignIndex={index}
                              dataNotifications={dataNotifications}
                              setDataNotifications={setDataNotifications}
                              setDeleteData={setDeleteData}
                          />
                      );
                  })
                : null}
            {renderCreateCampaignBannerForm ? (
                <CreateCampaignBannerForm
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    setRenderCreateCampaignBannerForm={
                        setRenderCreateCampaignBannerForm
                    }
                    userData={userData}
                    setUpdateUser={setUpdateUser}
                />
            ) : (
                createCampaignBanner()
            )}
            {joinCampaignBanner()}
            {/* If deleteData state has is not null render the DeletionModal */}
            {deleteData !== null ? (
                <CampaignDeletionModal
                    deleteData={deleteData}
                    setDeleteData={setDeleteData}
                    userData={userData}
                    setUpdateUser={setUpdateUser}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
            ) : null}
            {/* If there is an object within the dataNotifications state, render dataNotification component () */}
            {dataNotifications.length !== 0
                ? dataNotifications.map((notification, index) => {
                      return (
                          <DataNotification
                              dataNotifications={dataNotifications}
                              setDataNotifications={setDataNotifications}
                              notification={notification}
                              index={index}
                              key={`${notification.message} ${index}`}
                          />
                      );
                  })
                : null}
        </div>
    );
};

export default DashboardWrapper;
