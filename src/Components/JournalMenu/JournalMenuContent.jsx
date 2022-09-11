import React from "react";
import "./JournalMenuContent.css";
import QuestList from "../QuestList/QuestListWrapper";

const JournalMenuContent = (props) => {
    const {
        userAuthenticated,
        selectedTab,
        serosQuests,
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
            <QuestList serosQuests={serosQuests} showTooltip={showTooltip} />
        );
    };

    const npcListContent = () => {
        return (
            <>
                <p>Not yet implemented.</p>
            </>
        );
    };

    const conditionalRender = () => {
        let componentToRender = null;
        switch (selectedTab) {
            case "Create location":
                componentToRender = createLocationContent();
                break;
            case "Quest list":
                componentToRender = questListContent();
                break;
            case "NPC list":
                componentToRender = npcListContent();
                break;
            default:
                <p>test</p>;
        }
        return componentToRender;
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
