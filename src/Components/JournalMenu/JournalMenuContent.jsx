import React from "react";
import "./JournalMenuContent.css";
import LocationListWrapper from "../LocationList/LocationListWrapper";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";
import FrontPageWrapper from "../FrontPageWrapper/FrontPageWrapper";

const JournalMenuContent = (props) => {
    const {
        serosLocations,
        setLocationNotes,
        userAuthenticated,
        selectedTab,
        serosQuests,
        serosNPCs,
        renderCreationMarker,
        setRenderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerType,
        showTooltip,
        map,
    } = props;

    const createLocationContent = () => {
        return (
            <LocationListWrapper
                userAuthenticated={userAuthenticated}
                renderCreationMarker={renderCreationMarker}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerType={setCreationMarkerType}
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                map={map}
            />
        );
    };

    const questListContent = () => {
        return (
            <QuestListWrapper
                serosLocations={serosLocations}
                setLocationNotes={setLocationNotes}
                serosQuests={serosQuests}
                showTooltip={showTooltip}
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
                showTooltip={showTooltip}
                map={map}
            />
        );
    };

    const conditionalRender = () => {
        if (selectedTab === "Location List") {
            return createLocationContent();
        }

        if (selectedTab === "Quest list") {
            return questListContent();
        }

        if (selectedTab === "NPC list") {
            return npcListContent();
        }

        return <FrontPageWrapper />;
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
