import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CreationSidebar.css";

const CreationSidebar = (props) => {
    const {
        renderCreationSidebar,
        setRenderCreationSidebar,
        setRenderCreationMarker,
        inputStyles,
        // setRenderQuestCreationForm,
        // setRenderNPCCreationForm,
    } = props;

    if (!renderCreationSidebar) {
        return (
            <div
                className="creation-sidebar-icon-wrapper"
                id="sidebar-close"
                style={inputStyles}
                onClick={() => {
                    setRenderCreationSidebar(!renderCreationSidebar);
                }}
            >
                <FontAwesomeIcon
                    icon="chevron-right"
                    className="creation-sidebar-icon closed"
                />
            </div>
        );
    } else {
        return (
            <>
                <div id="creation-sidebar-wrapper" style={inputStyles}>
                    <div id="creation-sidebar-input-wrapper">
                        <h2>Create new data!</h2>
                        <button onClick={() => setRenderCreationMarker(true)}>
                            Add a new location!
                        </button>
                        {/* <button
                            onClick={() => setRenderQuestCreationForm(true)}
                        >
                            Add a new quest!
                        </button>
                        <button onClick={() => setRenderNPCCreationForm(true)}>
                            Add a new NPC!
                        </button> */}
                        {/* <button onClick={() => setRenderQuestList(true)}>Show all quests!</button> */}
                    </div>
                    <div
                        className="creation-sidebar-icon-wrapper"
                        id="sidebar-open"
                        onClick={() => {
                            setRenderCreationSidebar(!renderCreationSidebar);
                        }}
                    >
                        <FontAwesomeIcon
                            icon="chevron-left"
                            className="creation-sidebar-icon"
                        />
                    </div>
                </div>
            </>
        );
    }
};

export default CreationSidebar;
