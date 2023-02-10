import React from "react";
import "./JournalMenuContent.css";
import LocationListWrapper from "../LocationList/LocationListWrapper";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";
import ChangelogWrapper from "../ChangelogWrapper/ChangelogWrapper";
import EditLocation from "../EditLocation/EditLocation";

const JournalMenuContent = (props) => {
    const {
        serosLocations,
        setSerosLocations,
        setLocationNotes,
        userAuthenticated,
        selectedTab,
        serosQuests,
        setSerosQuests,
        serosNPCs,
        setSerosNPCs,
        renderCreationMarker,
        setRenderCreationMarker,
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

    if (markerBeingEdited !== null) {
        return (
            <EditLocation
                markerBeingEdited={markerBeingEdited}
                setMarkerBeingEdited={setMarkerBeingEdited}
                editLocationDetails={editLocationDetails}
                editMarkerLatLng={editMarkerLatLng}
                setEditMarkerType={setEditMarkerType}
                map={map}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                setChangelogData={setChangelogData}
            />
        );
    }

    const locationListContent = () => {
        return (
            <LocationListWrapper
                userAuthenticated={userAuthenticated}
                renderCreationMarker={renderCreationMarker}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerType={setCreationMarkerType}
                unfilteredSerosLocations={serosLocations}
                serosLocations={Array.from(serosLocations)}
                setSerosLocations={setSerosLocations}
                setLocationNotes={setLocationNotes}
                map={map}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                setChangelogData={setChangelogData}
            />
        );
    };

    const questListContent = () => {
        return (
            <QuestListWrapper
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                serosQuests={serosQuests}
                setSerosQuests={setSerosQuests}
                serosQuestsFiltered={Array.from(serosQuests)}
                map={map}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                setChangelogData={setChangelogData}
            />
        );
    };

    const npcListContent = () => {
        return (
            <NPCListWrapper
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                map={map}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                setChangelogData={setChangelogData}
            />
        );
    };

    const conditionalRender = () => {
        if (selectedTab === "Location List") {
            return locationListContent();
        }

        if (selectedTab === "Quest list") {
            return questListContent();
        }

        if (selectedTab === "NPC list") {
            return npcListContent();
        }

        // No tab has been selected, render changelog instead
        return (
            <ChangelogWrapper
                campaign={campaign}
                changelogData={changelogData}
                setChangelogData={setChangelogData}
            />
        );
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
