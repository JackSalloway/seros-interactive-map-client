import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";
import Separator from "../Separator/Separator";

const QuestNotes = (props) => {
    const {
        quest,
        originalIndex,
        setDeleteData,
        locationList,
        inputStyles,
        serosQuests,
        setSerosQuests,
        setQuestUpdated,
        setSerosNPCs,
    } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    // Update value states
    const [editing, setEditing] = useState(false);
    const [updatedQuestName, setUpdatedQuestName] = useState(
        he.decode(quest.name)
    );
    const [updatedQuestDescription, setUpdatedQuestDescription] = useState(
        he.decode(quest.desc)
    );
    const [updatedQuestStatus, setUpdatedQuestStatus] = useState(
        quest.completed
    );
    const [updatedQuestSelectedLocations, setUpdatedQuestSelectedLocations] =
        useState({});
    const [
        updatedQuestSelectedLocationsData,
        setUpdatedQuestSelectedLocationsData,
    ] = useState([]);

    useEffect(() => {
        // Reset update inputs on initial render and update form close
        if (editing === false) {
            setUpdatedQuestName(he.decode(quest.name));
            setUpdatedQuestDescription(he.decode(quest.desc));
            setUpdatedQuestStatus(quest.completed);
            setUpdatedQuestSelectedLocations(
                quest.associated_locations.map((location) => {
                    return {
                        value: he.decode(location._id),
                        label: he.decode(location.name),
                    };
                })
            ); // Set the values for selected locations (selection box)
            setUpdatedQuestSelectedLocationsData(
                quest.associated_locations.map((location) => location._id)
            );
        }
    }, [
        editing,
        quest.name,
        quest.desc,
        quest.completed,
        quest.associated_locations,
    ]);

    // useEffect(() => {
    //     // Set the values for selected locations (selection box)
    //     if ( updatedQuestSelectedLocations === {} ) {

    //     }

    // }, [ quest.associated_locations, updatedQuestSelectedLocations ]);

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
                    <h4>{he.decode(quest.name)}</h4>
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

    // Send POST request to update a quest
    const updateQuestData = async (e) => {
        e.preventDefault();

        const questData = {
            quest_name: updatedQuestName,
            quest_desc: updatedQuestDescription,
            quest_completed: updatedQuestStatus,
            quest_associated_locations: updatedQuestSelectedLocationsData,
            quest_id: quest._id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(questData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_quest`,
            init
        );
        const returnedData = await result.json();
        let serosQuestsCopy = [...serosQuests];
        console.log(returnedData.questResult.associated_locations[0].latlng);
        // The following assignment is needed due to how the latlng values were being returned as they were being returned like this:
        // {latlng: { lat: {$numberDecimal: LAT_VALUE}, lng: {$numberDecimal: LNG_VALUE} }}
        // I suspect this has something to do with the way the backend is returning the mongodb document - however this works for now.
        returnedData.questResult.associated_locations[0].latlng = {
            lat: returnedData.questResult.associated_locations[0].latlng.lat
                .$numberDecimal,
            lng: returnedData.questResult.associated_locations[0].latlng.lng
                .$numberDecimal,
        };
        console.log(returnedData.questResult.associated_locations[0].latlng);
        serosQuestsCopy[originalIndex] = returnedData.questResult;
        setSerosQuests(serosQuestsCopy);
        setSerosNPCs(returnedData.npcResult);
        setQuestUpdated(true);
        setEditing(false);
    };

    // Function to handle changes in the selection box
    const handleQuestLocationChange = (locations) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        // console.log(value);
        setUpdatedQuestSelectedLocations(
            locations.map((location) => {
                return {
                    value: he.decode(location.value),
                    label: he.decode(location.label),
                };
            })
        );
        setUpdatedQuestSelectedLocationsData(
            locations.map((location) => location.value)
        );
    };

    // Create react select component for quest associated locations
    const questLocationSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={locationList}
            value={updatedQuestSelectedLocations}
            isMulti={true}
            onChange={handleQuestLocationChange}
            styles={customStyles}
            id="quest-location"
        />
    );

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
                        <h4>{he.decode(quest.name)}</h4>
                        <FontAwesomeIcon
                            icon="times"
                            className="journal-fa-icon cancel-edit"
                            onClick={() => {
                                setEditing(false);
                            }}
                        />
                    </div>
                    <form
                        onSubmit={updateQuestData}
                        className="location-notes-form quest-form"
                    >
                        <div className="create-location-quest-name location-notes-create">
                            <label htmlFor="quest-name">
                                Quest Name:
                                <input
                                    id="quest-name"
                                    value={he.decode(updatedQuestName)}
                                    type="string"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedQuestName(target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-location-quest-desc location-notes-create">
                            <label htmlFor="quest-desc">
                                Quest Description:
                                <textarea
                                    id="quest-desc"
                                    value={he.decode(updatedQuestDescription)}
                                    type="text"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedQuestDescription(
                                            target.value
                                        );
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-location-quest-status location-notes-create">
                            <label htmlFor="quest-status">
                                Quest Status:
                                <select
                                    name="quest-status"
                                    defaultValue={updatedQuestStatus}
                                    id="quest-status"
                                    onChange={({ target }) => {
                                        setUpdatedQuestStatus(target.value);
                                    }}
                                >
                                    <option value="default" disabled>
                                        Select a status!
                                    </option>
                                    <option value={false}>Incompleted</option>
                                    <option value={true}>Completed</option>
                                </select>
                            </label>
                        </div>

                        <div className="create-location-quest-associated-locations location-notes-create">
                            <label htmlFor="quest-associated-locations">
                                Quest Associated Locations:
                                {questLocationSelection()}
                            </label>
                        </div>

                        <div className="location-notes-submit">
                            <button>Update Quest!</button>
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
                key={quest.name}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundImage: `url(./images/papyr.jpg)` }}
            >
                <div className="location-notes-details-header details-open">
                    <div className="location-notes-details-data-section name-section">
                        <h4>{he.decode(quest.name)}</h4>
                        {quest.completed === true ? (
                            <p>Quest completed!</p>
                        ) : (
                            <p>Quest Incomplete</p>
                        )}
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
                                onClick={() => setDeleteData(quest)}
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
                    <h5>Quest Description:</h5>
                    <p>{he.decode(quest.desc)}</p>
                </div>
                <Separator />
                <div className="location-notes-details-data-section associated-locations-section">
                    <h5>Relevant Locations:</h5>
                    <ul>
                        {quest.associated_locations.map((location) => (
                            <li key={location._id}>
                                {he.decode(location.name)}
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator />
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(./images/statblockbar.jpg)` }}
            />
        </div>
    );
};

export default QuestNotes;
