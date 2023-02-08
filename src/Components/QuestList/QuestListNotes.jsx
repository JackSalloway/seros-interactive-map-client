import React, { useState, useEffect } from "react";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../imports/imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./QuestListNotes.css";

const QuestListNotes = (props) => {
    const {
        quest,
        originalIndex,
        map,
        serosLocations,
        setLocationNotes,
        campaignID,
        username,
        dataNotifications,
        setDataNotifications,
        serosQuests,
        setSerosQuests,
        setChangelogData,
    } = props;

    // quest={quest.questData}
    // originalIndex={quest.originalIndex}
    // key={quest._id}
    // map={map}
    // serosLocations={serosLocations}
    // setLocationNotes={setLocationNotes}
    // campaignID={campaign.id}
    // username={userAuthenticated.username}
    // dataNotifications={dataNotifications}
    // setDataNotifications={setDataNotifications}
    // serosQuests={serosQuests}
    // setSerosQuests={setSerosQuests}
    // setChangelogData={setChangelogData}

    const [selected, setSelected] = useState(false);

    // Update "locationless" quest states
    const [locationList, setLocationList] = useState([]);
    const [updatedQuestSelectedLocations, setUpdatedQuestSelectedLocations] =
        useState([]);

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
            <div className="quest-list-notes-individual quest-list-notes-individual-header">
                {quest.associated_locations.length === 0 ? (
                    <p
                        style={{
                            color: quest.completed === true ? "green" : "red",
                        }}
                    >
                        *{he.decode(quest.name)}*
                    </p>
                ) : (
                    <p
                        style={{
                            color: quest.completed === true ? "green" : "red",
                        }}
                    >
                        {he.decode(quest.name)}
                    </p>
                )}
                {expandDownChevron}
            </div>
        );
    }

    // Create components for each quest when they are clicked
    // Take first sentence from quest description
    const questBriefDesc = he.decode(quest.desc.split(".")[0] + "...");

    // POST request to update a locationless quest and assign locations to it.
    const assignLocationsToQuest = async () => {
        const updatedQuestData = {
            quest_associated_locations: updatedQuestSelectedLocations.map(
                (location) => location.value
            ),
            quest_id: quest._id,
            quest_name: quest.name,
            quest_campaign: campaignID,
            username: username,
        };
        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(updatedQuestData),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/locationless_quest`, // Added locationless on the end to differentiate from other update quest route
            init
        );
        const returnedData = await result.json();
        console.log(returnedData);
        // Update quests values
        let serosQuestsCopy = [...serosQuests];
        serosQuestsCopy[originalIndex] = returnedData.questResult;
        setSerosQuests(serosQuestsCopy);
        // Update notifications values
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `NPC: ${quest.name} successfully updated!`,
            important: false,
        });
        setDataNotifications([...notificationsCopy]);
        setSelected(false);
        // Update changelog
        setChangelogData(returnedData.changelogResult.changes);
    };

    // Function to handle changes inside the quest associated locations box
    const handleQuestLocationChange = (value) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        setUpdatedQuestSelectedLocations(
            value.map((location) => {
                return {
                    value: he.decode(location.value),
                    label: he.decode(location.label),
                };
            })
        );
    };

    // Create a react select component for quest associated locations
    const questLocationSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={locationList}
            defaultValue={updatedQuestSelectedLocations}
            isMulti={true}
            onChange={handleQuestLocationChange}
            styles={customStyles}
            id="npc-locations"
        />
    );

    // Create a list of associated locations and a button that takes the user to that location
    const questAssociatedLocationsList = () => {
        if (quest.associated_locations.length === 0) {
            return (
                <div className="npc-list-notes-locations-name">
                    This quest has no associated locations, select locations to
                    assign them.
                    {locationList.length === 0 ? (
                        <div>
                            There are no locations available, create one first.
                        </div>
                    ) : (
                        <>
                            {questLocationSelection()}
                            <button
                                disabled={
                                    updatedQuestSelectedLocations.length === 0
                                        ? true
                                        : false
                                }
                                onClick={assignLocationsToQuest}
                            >
                                Update quest
                            </button>
                        </>
                    )}
                </div>
            );
        } else {
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
        }
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
