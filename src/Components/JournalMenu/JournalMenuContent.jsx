import React from "react";
import "./JournalMenuContent.css";
import CreationMarkerMenuWrapper from "./CreationMarkerMenuWrapper/CreationMarkerMenuWrapper";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";

const JournalMenuContent = (props) => {
    const {
        serosLocations,
        setLocationNotes,
        userAuthenticated,
        selectedTab,
        serosQuests,
        serosNPCs,
        setRenderCreationMarker,
        creationMarkerLatLng,
        showTooltip,
        map,
    } = props;

    const createLocationContent = () => {
        return (
            <CreationMarkerMenuWrapper
                userAuthenticated={userAuthenticated}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
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
        if (selectedTab === "Create location") {
            return createLocationContent();
        }

        if (selectedTab === "Quest list") {
            return questListContent();
        }

        if (selectedTab === "NPC list") {
            return npcListContent();
        }

        return null;
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
