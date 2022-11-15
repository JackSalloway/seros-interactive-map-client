import React from "react";
import "./JournalMenuContent.css";
import LocationListWrapper from "../LocationList/LocationListWrapper";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";
import FrontPageWrapper from "../FrontPageWrapper/FrontPageWrapper";
import EditLocation from "../EditLocation/EditLocation";

const JournalMenuContent = (props) => {
    const {
        serosLocations,
        setSerosLocations,
        setLocationNotes,
        userAuthenticated,
        selectedTab,
        serosQuests,
        serosNPCs,
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
            />
        );
    };

    const questListContent = () => {
        return (
            <QuestListWrapper
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                serosQuests={serosQuests}
                map={map}
            />
        );
    };

    const npcListContent = () => {
        return (
            <NPCListWrapper
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                map={map}
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

        return (
            <FrontPageWrapper
                markerBeingEdited={markerBeingEdited}
                setMarkerBeingEdited={setMarkerBeingEdited}
            />
        );
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
