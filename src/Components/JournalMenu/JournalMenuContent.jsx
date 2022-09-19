import React from "react";
import "./JournalMenuContent.css";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";

const JournalMenuContent = (props) => {
    const {
        userAuthenticated,
        selectedTab,
        serosQuests,
        serosNPCs,
        setRenderCreationMarker,
        showTooltip,
    } = props;

    const createLocationContent = () => {
        return (
            <div id="create-location-wrapper">
                {userAuthenticated.privileged === true ? (
                    <>
                        <h2>Click here to add a new location on the map!</h2>
                        <button
                            onClick={() => {
                                setRenderCreationMarker(true);
                            }}
                        >
                            Add a new location!
                        </button>
                    </>
                ) : (
                    <>
                        <h2>
                            You need to sign into a privileged account to create
                            new locations.
                        </h2>
                    </>
                )}
                <h2>Or select a location to display notes!</h2>
            </div>
        );
    };

    const questListContent = () => {
        return (
            <QuestListWrapper
                serosQuests={serosQuests}
                showTooltip={showTooltip}
            />
        );
    };

    const npcListContent = () => {
        return (
            <NPCListWrapper serosNPCs={serosNPCs} showTooltip={showTooltip} />
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
