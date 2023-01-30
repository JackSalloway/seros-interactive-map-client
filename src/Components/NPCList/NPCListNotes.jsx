import React, { useState, useEffect } from "react";
import Select from "react-select";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../imports/imports";
import "./NPCListNotes.css";

const NPCListNotes = (props) => {
    const { npc, map, serosLocations, setLocationNotes } = props;

    const [selected, setSelected] = useState(false);

    // Update "locationless" npc states
    const [locationList, setLocationList] = useState([]);
    const [newNPCSelectedLocations, setNewNPCSelectedLocations] = useState([
        // {
        //     value: he.decode(locationNotes._id),
        //     label: he.decode(locationNotes.name),
        // },
    ]);

    // Populate locationList with locations
    useEffect(() => {
        if (locationList.length !== serosLocations.length) {
            setLocationList([
                ...locationList,
                ...serosLocations.map((location) => ({
                    value: he.decode(location._id),
                    label: he.decode(location.name),
                })),
            ]);
        }
    }, [serosLocations, locationList]);

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
                {npc.associated_locations.length === 0 ? (
                    <p>*{he.decode(npc.name)}*</p>
                ) : (
                    <p>{he.decode(npc.name)}</p>
                )}
                {expandDownChevron}
            </div>
        );
    }

    // Create components for each npc when they are clicked
    // Take first sentence from npc description
    const npcBriefDesc = he.decode(npc.desc.split(".")[0] + "...");

    // POST request to update a locationless npc and assign locations to it.
    const assignLocationsToNPC = (e) => {
        e.preventDefault();
    };

    // Function to handle changes inside the npc associated locations box
    const handleNPCLocationChange = (value) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        setNewNPCSelectedLocations(
            value.map((location) => {
                return {
                    value: he.decode(location.value),
                    label: he.decode(location.label),
                };
            })
        );
    };

    // Create a react select component for npc associated locations
    const npcLocationSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={locationList}
            defaultValue={newNPCSelectedLocations}
            isMulti={true}
            onChange={handleNPCLocationChange}
            styles={customStyles}
            id="npc-locations"
        />
    );

    // Create a list of associated locations and a button that takes the user to that location
    const npcAssociatedLocationsList = () => {
        if (npc.associated_locations.length === 0) {
            return (
                <div className="npc-list-notes-locations-name">
                    This NPC has no associated locations, select locations to
                    assign them.
                    {locationList.length === 0 ? (
                        <div>
                            There are no locations available, create one first.
                        </div>
                    ) : (
                        npcLocationSelection()
                    )}
                    {/* {if (locationList.length === 0) {
                        return (<div></div>)
                    }} */}
                </div>
            );
        } else {
            return npc.associated_locations.map((location) => (
                <div className="npc-list-notes-locations" key={location._id}>
                    <div className="npc-list-notes-locations-name">
                        {he.decode(location.name)}
                    </div>
                    <button
                        className="npc-list-notes-locations-lat-lng"
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
        }
    };

    if (selected === true) {
        return (
            <>
                <div className="npc-list-notes-individual npc-list-notes-individual-header">
                    <p>{he.decode(npc.name)}</p>
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
