import React, { useState, useEffect } from "react";
import "./Journal.css";
import LocationNotes from "../LocationNotes/LocationNotes";
// import DashboardJournal from "../DashboardJournal/DashboardJournal";
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
        changelogData,
        setChangelogData,
    } = props;

    const [selectedTab, setSelectedTab] = useState("Front Page");

    useEffect(() => {
        if (markerBeingEdited !== null) {
            setSelectedTab("Front Page");
        }
    }, [markerBeingEdited]);

    if (Object.keys(userAuthenticated).length === 0) {
        return null;
    }

    // If a location has not been selected yet, display the front page
    if (locationNotes === null) {
        return (
            <div id="journal-front-page-container" className="journal">
                {campaign === null ? null : (
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
                            setSerosNPCs={setSerosNPCs}
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
                            changelogData={changelogData}
                            setChangelogData={setChangelogData}
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
                setChangelogData={setChangelogData}
                username={userAuthenticated.username}
            />
        </div>
    );
};

export default Journal;
