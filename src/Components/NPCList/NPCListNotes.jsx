import React, { useState } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NPCListNotes.css";

const NPCListNotes = (props) => {
    const { npc, map, serosLocations, setLocationNotes } = props;

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
            <div className="npc-list-notes-individual npc-list-notes-individual-header">
                <p
                    style={{
                        color: npc.disposition === "Friendly" ? "green" : "red",
                    }}
                >
                    {he.decode(npc.name)}
                </p>
                {expandDownChevron}
            </div>
        );
    }

    // Create components for each npc when they are clicked
    // Take first sentence from npc description
    const npcBriefDesc = he.decode(npc.desc.split(".")[0] + "...");

    // Create a list of associated locations and a button that takes the user to that location
    const npcAssociatedLocationsList = () => {
        return npc.associated_locations.map((location) => (
            <div className="npc-list-notes-locations" key={location._id}>
                <div className="npc-list-notes-locations-name">
                    {he.decode(location.name)}
                </div>
                <button
                    className="npc-list-notes-locations-lat-lng"
                    onClick={() => {
                        // console.log(location);
                        // console.log(serosLocations);
                        // console.log(serosLocations.indexOf(location._id));
                        if (map.current.getZoom() === 5) {
                            map.current.flyTo(location.latlng);
                        } else {
                            map.current.setView(location.latlng, 5);
                        }
                        // map.current.flyTo(location.latlng);
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
                <div className="npc-list-notes-individual npc-list-notes-individual-header">
                    <p
                        style={{
                            color:
                                npc.disposition === "Friendly"
                                    ? "green"
                                    : "red",
                        }}
                    >
                        {he.decode(npc.name)}
                    </p>
                    {collapseUpChevron}
                </div>
                <div className="npc-list-notes-individual npc-list-notes-individual-information">
                    <p>{npcBriefDesc}</p>
                    {npcAssociatedLocationsList()}
                </div>
            </>
        );
    }
};

export default NPCListNotes;
