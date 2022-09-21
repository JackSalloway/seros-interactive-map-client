import React, { useState } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./QuestListNotes.css";

const QuestListNotes = (props) => {
    const { quest, map, serosLocations, setLocationNotes } = props;

    const [selected, setSelected] = useState(false);

    const expandDownChevron = (
        <FontAwesomeIcon
            icon="chevron-down"
            className="journal-fa-icon"
            onClick={() => {
                setSelected(true);
            }}
        />
    );

    const collapseUpChevron = (
        <FontAwesomeIcon
            icon="chevron-up"
            className="journal-fa-icon"
            onClick={() => {
                setSelected(false);
            }}
        />
    );

    if (selected === false) {
        return (
            <div className="quest-list-notes-individual quest-list-notes-individual-header">
                <p
                    style={{
                        color: quest.completed === true ? "green" : "red",
                    }}
                >
                    {he.decode(quest.name)}
                </p>
                {expandDownChevron}
            </div>
        );
    }

    // Create components for each quest when they are clicked
    // Take first sentence from quest description
    const questBriefDesc = he.decode(quest.desc.split(".")[0] + "...");

    // Create a list of associated locations and a button that takes the user to that location
    const questAssociatedLocationsList = () => {
        return quest.associated_locations.map((location) => (
            <div className="quest-list-notes-locations" key={location._id}>
                <div className="quest-list-notes-locations-name">
                    {he.decode(location.name)}
                </div>
                <button
                    className="quest-list-notes-locations-lat-lng"
                    onClick={() => {
                        if (map.current.getZoom() === 5) {
                            map.current.flyTo(location.latlng);
                        } else {
                            map.current.setView(location.latlng, 5);
                        }
                        setLocationNotes(
                            serosLocations
                                .map((serosLocation) => serosLocation._id)
                                .indexOf(location._id)
                        );
                    }}
                >
                    Jump to location!
                </button>
            </div>
        ));
    };

    if (selected === true) {
        return (
            <>
                <div className="quest-list-notes-individual quest-list-notes-individual-header">
                    <p
                        style={{
                            color: quest.completed === true ? "green" : "red",
                        }}
                    >
                        {he.decode(quest.name)}
                    </p>
                    {collapseUpChevron}
                </div>
                <div className="quest-list-notes-individual quest-list-notes-individual-information">
                    <p>{questBriefDesc}</p>
                    {questAssociatedLocationsList()}
                </div>
            </>
        );
    }
};

export default QuestListNotes;
