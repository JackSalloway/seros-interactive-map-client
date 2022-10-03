import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
    splitParas,
} from "../../../imports/imports";
import Separator from "../Separator/Separator";

const NPCNotes = (props) => {
    const {
        npc,
        setDeleteData,
        questList,
        locationList,
        inputStyles,
        serosNPCs,
        setSerosNPCs,
        originalIndex,
    } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    // Update value states
    const [editing, setEditing] = useState(false);
    const [updatedNPCName, setUpdatedNPCName] = useState(npc.name);
    const [updatedNPCRace, setUpdatedNPCRace] = useState({
        value: npc.race,
        label: npc.race,
    });
    const [updatedNPCDescription, setUpdatedNPCDescription] = useState(
        npc.desc
    );
    const [updatedNPCDispostion, setUpdatedNPCDisposition] = useState(
        npc.disposition
    );
    const [updatedNPCQuests, setUpdatedNPCQuests] = useState(npc.quests);
    const [updatedNPCSelectedLocations, setUpdatedNPCSelectedLocations] =
        useState({});

    useEffect(() => {
        // Reset update inputs on initial render and update form close
        if (editing === false) {
            setUpdatedNPCName(he.decode(npc.name));
            setUpdatedNPCRace({ value: npc.race, label: npc.race });
            setUpdatedNPCDescription(he.decode(npc.desc));
            setUpdatedNPCDisposition(npc.disposition);
            setUpdatedNPCQuests(
                npc.quests.map((quest) => {
                    return {
                        value: he.decode(quest._id),
                        label: he.decode(quest.name),
                    };
                })
            ); // Set the values for selected quests (selection box)
            setUpdatedNPCSelectedLocations(
                npc.associated_locations.map((location) => {
                    return {
                        value: he.decode(location._id),
                        label: he.decode(location.name),
                    };
                })
            ); // Set the values for selected locations (selection box)
        }
    }, [editing, npc]);

    if (selected === false) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details-header details-closed location-notes-brighter-filter"
                    style={{ backgroundImage: `url(./images/papyr.jpg)` }}
                >
                    <h4>{he.decode(npc.name)}</h4>
                    <FontAwesomeIcon
                        icon="chevron-down"
                        className="journal-fa-icon"
                        onClick={() => {
                            setSelected(!selected);
                        }}
                    />
                </div>
                <div
                    className="location-notes-details-border bottom"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    // Function to handle changes inside the npc race selection box
    const handleNPCRaceChange = (race) => {
        setUpdatedNPCRace({ value: race.value, label: race.value });
    };

    const raceOptions = [
        { value: "Beholder", label: "Beholder" },
        { value: "Dragon", label: "Dragon" },
        { value: "Dragonborn", label: "Dragonborn" },
        { value: "Dwarf", label: "Dwarf" },
        { value: "Elf", label: "Elf" },
        { value: "Firbolg", label: "Firbolg" },
        { value: "Genasi", label: "Genasi" },
        { value: "Giant", label: "Giant" },
        { value: "Gnome", label: "Gnome" },
        { value: "Half-Elf", label: "Half-Elf" },
        { value: "Halfling", label: "Halfing" },
        { value: "Half-Orc", label: "Half-Orc" },
        { value: "Human", label: "Human" },
        { value: "Kobold", label: "Kolbold" },
        { value: "Mindflayer", label: "Mindflayer" },
        { value: "Orc", label: "Orc" },
        { value: "Tabaxi", label: "Tabaxi" },
        { value: "Tiefling", label: "Tiefling" },
        { value: "Tortle", label: "Tortle" },
        { value: "Other", label: "Other" },
    ];

    const npcRaceSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={raceOptions}
            value={updatedNPCRace}
            isMulti={false}
            onChange={handleNPCRaceChange}
            styles={customStyles}
            id="npc-race"
        />
    );

    // Function to handle changes inside the npc associated quests selection box
    const handleNPCQuestChange = (quests) => {
        setUpdatedNPCQuests(
            quests.map((quest) => {
                return {
                    value: he.decode(quest.value),
                    label: he.decode(quest.label),
                };
            })
        );
    };

    // Create a react select component for npc associated quests
    const npcQuestSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={questList}
            value={updatedNPCQuests}
            isMulti={true}
            onChange={handleNPCQuestChange}
            styles={customStyles}
            id="npc-quests"
        />
    );

    // Function to handle changes inside the npc associated locations box
    const handleNPCLocationChange = (locations) => {
        setUpdatedNPCSelectedLocations(
            locations.map((location) => {
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
            value={updatedNPCSelectedLocations}
            isMulti={true}
            onChange={handleNPCLocationChange}
            styles={customStyles}
            id="npc-locations"
        />
    );

    // Send POST request to edit this NPC
    const updateNPCData = async (e) => {
        e.preventDefault();

        const NPCData = {
            npc_name: updatedNPCName,
            npc_race: updatedNPCRace.value,
            npc_desc: updatedNPCDescription,
            npc_disposition: updatedNPCDispostion,
            npc_associated_locations: updatedNPCSelectedLocations.map(
                (location) => location.value
            ),
            npc_quests: updatedNPCQuests.map((quest) => quest.value),
            npc_id: npc._id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(NPCData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_npc`,
            init
        );
        const returnedData = await result.json();
        let serosNPCsCopy = [...serosNPCs];
        serosNPCsCopy[originalIndex] = returnedData;
        setSerosNPCs(serosNPCsCopy);
        setEditing(false);
    };

    if (editing === true) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details location-notes-brighter-filter"
                    style={{ backgroundImage: `url(./images/papyr.jpg)` }}
                >
                    <div className="location-notes-details-data-section name-section editing">
                        <h4>{he.decode(npc.name)}</h4>
                        <FontAwesomeIcon
                            icon="times"
                            className="journal-fa-icon cancel-edit"
                            onClick={() => {
                                setEditing(false);
                            }}
                        />
                    </div>
                    <form
                        onSubmit={updateNPCData}
                        className="location-notes-form quest-form"
                    >
                        <div className="create-location-npc-name location-notes-create">
                            <label htmlFor="npc-name">
                                NPC Name:
                                <input
                                    id="npc-name"
                                    value={he.decode(updatedNPCName)}
                                    type="string"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedNPCName(target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-npc-race location-notes-create">
                            <label htmlFor="npc-race">
                                NPC Race:
                                {npcRaceSelection()}
                            </label>
                        </div>

                        <div className="create-location-npc-desc location-notes-create">
                            <label htmlFor="npc-desc">
                                NPC Description:
                                <textarea
                                    id="npc-desc"
                                    value={he.decode(updatedNPCDescription)}
                                    type="text"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedNPCDescription(target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-location-disposition-status location-notes-create">
                            <label htmlFor="disposition-status">
                                NPC Disposition:
                                <select
                                    name="disposition-status"
                                    defaultValue={updatedNPCDispostion}
                                    id="npc-disposition"
                                    onChange={({ target }) => {
                                        setUpdatedNPCDisposition(target.value);
                                    }}
                                >
                                    <option value="default" disabled>
                                        Select a disposition!
                                    </option>
                                    <option value="Friendly">Friendly</option>
                                    <option value="Neutral">Neutral</option>
                                    <option value="Hostile">Hostile</option>
                                </select>
                            </label>
                        </div>

                        <div className="create-npc-associated-locations location-notes-create">
                            <label htmlFor="quest-associated-locations">
                                NPC Associated Locations:
                                {npcLocationSelection()}
                            </label>
                        </div>

                        <div className="create-npc-associated-quests location-notes-create">
                            <label htmlFor="quest-associated-locations">
                                NPC Associated Quests:
                                {npcQuestSelection()}
                            </label>
                        </div>

                        <div className="location-notes-submit">
                            <button>Update NPC!</button>
                        </div>
                    </form>
                </div>
                <div
                    className="location-notes-details-border bottom"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    return (
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(./images/statblockbar.jpg)` }}
            />
            <div
                className="location-notes-details location-notes-brighter-filter location-notes-open-internal"
                key={npc.name}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundImage: `url(./images/papyr.jpg)` }}
            >
                <div className="location-notes-details-header details-open">
                    <div className="location-notes-details-data-section name-section">
                        <h4>{he.decode(npc.name)}</h4>
                        <p>
                            {npc.race}, {npc.disposition.toLowerCase()}
                        </p>
                    </div>

                    <FontAwesomeIcon
                        icon="chevron-up"
                        className="journal-fa-icon"
                        onClick={() => {
                            setSelected(!selected);
                        }}
                    />
                    {hover === true ? (
                        <div
                            className="notes-button-wrapper hovered"
                            style={inputStyles}
                        >
                            <FontAwesomeIcon
                                icon="pencil"
                                className="journal-fa-icon"
                                onClick={() => setEditing(true)}
                            />
                            <FontAwesomeIcon
                                icon="trash-can"
                                className="journal-fa-icon"
                                onClick={() => setDeleteData(npc)}
                            />
                        </div>
                    ) : (
                        <div
                            className="notes-button-wrapper unhovered"
                            style={inputStyles}
                        >
                            <FontAwesomeIcon
                                icon="pencil"
                                className="journal-fa-icon"
                            />
                            <FontAwesomeIcon
                                icon="trash-can"
                                className="journal-fa-icon"
                            />
                        </div>
                    )}
                </div>
                <Separator />
                <div className="location-notes-details-data-section description-section">
                    <h5>Description:</h5>
                    {splitParas(npc.desc).map((para) => (
                        <p className="location-notes-description-paragraph">
                            {he.decode(para)}
                        </p>
                    ))}
                </div>
                <Separator />
                <div className="location-notes-details-data-section associated-locations-section">
                    <h5>Relevant Locations:</h5>
                    <ul>
                        {npc.associated_locations.map((location) => (
                            <li key={location._id}>
                                {he.decode(location.name)}
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator />

                {npc.quests.length > 0 ? (
                    <div className="location-notes-details-data-section quests-section">
                        <h5>Relevant Quests:</h5>
                        <ul>
                            {npc.quests.map((quest) => (
                                <li>{he.decode(quest.name)}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {npc.quests.length > 0 ? <Separator /> : null}
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(./images/statblockbar.jpg)` }}
            />
        </div>
    );
};

export default NPCNotes;
