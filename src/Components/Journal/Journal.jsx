import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Journal.css";
import LocationNotes from "../LocationNotes/LocationNotes";
import DashboardJournal from "../DashboardJournal/DashboardJournal";
import JournalMenuHeaderBox from "../JournalMenu/JournalMenuHeaderBox";
import JournalMenuContent from "../JournalMenu/JournalMenuContent";

const Journal = (props) => {
    const {
        locationNotes,
        setLocationNotes,
        serosNPCs,
        setSerosNPCs,
        locationNPCs,
        setLocationNPCs,
        locationQuests,
        setLocationQuests,
        serosLocations,
        setSerosLocations,
        serosQuests,
        setSerosQuests,
        setDeleteData,
        userAuthenticated,
        setUserAuthenticated,
        setRenderCreationMarker,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerType,
        map,
        markerBeingEdited,
        setMarkerBeingEdited,
        editLocationDetails,
        editMarkerLatLng,
        setEditMarkerType,
        dataNotifications,
        setDataNotifications,
        campaign,
        renderCampaignForm,
        setRenderCampaignForm,
        setCampaign,
        renderCampaignSettings,
        setRenderCampaignSettings,
    } = props;

    const [selectedTab, setSelectedTab] = useState("Front Page");

    useEffect(() => {
        if (markerBeingEdited !== null) {
            setSelectedTab("Front Page");
        }
    }, [markerBeingEdited]);

    const logout = async () => {
        await axios({
            method: "get",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/logout`,
        });
        // Set value to true
        setUserAuthenticated({});
        setCampaign(null);
        setSerosLocations(null);
        setSerosNPCs(null);
        setSerosQuests(null);
        setRenderCampaignSettings(null);
    };

    if (Object.keys(userAuthenticated).length === 0) {
        return null;
    }

    // If a location has not been selected yet, display the front page
    if (locationNotes === null) {
        return (
            <div id="journal-front-page-container" className="journal">
                <div className="login-status">
                    <p id="status-username">{userAuthenticated.username}</p>
                    <button
                        id="logout-button"
                        onClick={() => {
                            logout();
                        }}
                    >
                        Logout
                    </button>
                    {campaign !== null ? (
                        <button
                            id="return-to-dashboard-button"
                            onClick={() => {
                                setCampaign(null);
                                setSerosLocations(null);
                                setSerosNPCs(null);
                                setSerosQuests(null);
                            }}
                        >
                            Return to Dashboard
                        </button>
                    ) : null}
                </div>
                {campaign === null ? (
                    <DashboardJournal
                        userAuthenticated={userAuthenticated}
                        setUserAuthenticated={setUserAuthenticated}
                        renderCampaignForm={renderCampaignForm}
                        setRenderCampaignForm={setRenderCampaignForm}
                        renderCampaignSettings={renderCampaignSettings}
                        setRenderCampaignSettings={setRenderCampaignSettings}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                ) : (
                    <div id="journal-front-page-menu">
                        <div id="journal-front-page-menu-header">
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"Location List"}
                                boxPosition={"instruction-header-box-end"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"Quest list"}
                                boxPosition={"instruction-header-box-middle"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"NPC list"}
                                boxPosition={"instruction-header-box-end"}
                                markerBeingEdited={markerBeingEdited}
                            />
                        </div>
                        <JournalMenuContent
                            serosLocations={serosLocations}
                            setSerosLocations={setSerosLocations}
                            setLocationNotes={setLocationNotes}
                            userAuthenticated={userAuthenticated}
                            selectedTab={selectedTab}
                            serosQuests={serosQuests}
                            serosNPCs={serosNPCs}
                            renderCreationMarker={renderCreationMarker}
                            setRenderCreationMarker={setRenderCreationMarker}
                            creationMarkerLatLng={creationMarkerLatLng}
                            setCreationMarkerType={setCreationMarkerType}
                            map={map}
                            markerBeingEdited={markerBeingEdited}
                            setMarkerBeingEdited={setMarkerBeingEdited}
                            editLocationDetails={editLocationDetails}
                            editMarkerLatLng={editMarkerLatLng}
                            setEditMarkerType={setEditMarkerType}
                            dataNotifications={dataNotifications}
                            setDataNotifications={setDataNotifications}
                            campaign={campaign}
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="journal">
            <LocationNotes
                locationNotes={locationNotes}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                locationNPCs={locationNPCs}
                setLocationNPCs={setLocationNPCs}
                locationQuests={locationQuests}
                setLocationQuests={setLocationQuests}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                serosQuests={serosQuests}
                setSerosQuests={setSerosQuests}
                setDeleteData={setDeleteData}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
            />
        </div>
    );
};

export default Journal;
