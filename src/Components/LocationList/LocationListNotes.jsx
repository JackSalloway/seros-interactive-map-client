import React, { useState } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LocationListNotes.css";

const LocationListNotes = (props) => {
    const {
        location,
        unfilteredSerosLocations,
        serosLocations,
        setLocationNotes,
        map,
    } = props;

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
            <div className="location-list-notes-individual location-list-notes-individual-header">
                <p>{he.decode(location.name)}</p>
                {expandDownChevron}
            </div>
        );
    }

    // Create components for each location when they are clicked
    // Take first sentence from location description
    const locationBriefDesc = location.desc
        ? he.decode(location.desc.split(".")[0] + "...")
        : "This location has no description...";

    // Create a button to jump to this location on the map, and set it as active notes
    const jumpToLocationButton = (
        <button
            className="location-list-notes-location-lat-lng"
            onClick={() => {
                if (map.current.getZoom() === 5) {
                    map.current.flyTo(location.latlng);
                } else {
                    map.current.setView(location.latlng, 5);
                }
                setLocationNotes(
                    unfilteredSerosLocations
                        .map((serosLocation) => serosLocation._id)
                        .indexOf(location._id)
                );
                console.log(location);
            }}
        >
            Jump to location!
        </button>
    );

    if (selected === true) {
        return (
            <>
                <div className="location-list-notes-individual location-list-notes-individual-header">
                    <p>{he.decode(location.name)}</p>
                    {collapseUpChevron}
                </div>
                <div className="location-list-notes-individual location-list-notes-individual-information">
                    <p>{locationBriefDesc}</p>
                    {jumpToLocationButton}
                </div>
            </>
        );
    }

    return (
        <div>
            <p>{he.decode(location.name)}</p>
        </div>
    );
};

export default LocationListNotes;
