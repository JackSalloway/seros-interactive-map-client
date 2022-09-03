import React, { useState, useEffect } from "react";
import "./LocationNotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";

// Component imports
import SubLocationWrapper from "./SubLocations/SubLocationWrapper";
import NPCWrapper from "./NPCs/NPCWrapper";
import QuestWrapper from "./Quests/QuestWrapper";

const LocationNotes = (props) => {
    const {
        locationNotes,
        setLocationNotes,
        serosNPCs,
        setSerosNPCs,
        locationNPCs,
        setLocationNPCs,
        locationQuests,
        setLocationQuests,
        serosLocations,
        setSerosLocations,
        serosQuests,
        setSerosQuests,
        setDeleteData,
        inputStyles,
    } = props;

    // Set states
    const [dataFetched, setDataFetched] = useState(false);
    const [showSubLocations, setShowSubLocations] = useState(false);
    const [showNPCs, setShowNPCs] = useState(false);
    const [showQuests, setShowQuests] = useState(false);
    const [locationList, setLocationList] = useState([]);
    const [questList, setQuestList] = useState([]);

    // Sub Location states
    const [addNewSubLocation, setAddNewSubLocation] = useState(false);

    // NPC states
    const [addNewNPC, setAddNewNPC] = useState(false);

    // Quest states
    const [addNewQuest, setAddNewQuest] = useState(false);
    const [questUpdated, setQuestUpdated] = useState(false);

    // Ensure data is loaded before rendering quest notes
    useEffect(() => {
        if (locationNPCs === null && locationQuests === null) {
            return;
        }
        setDataFetched(true);
    }, [locationNPCs, locationQuests]);

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

    // Populate questList with quests
    useEffect(() => {
        if (questList.length !== serosQuests.length) {
            setQuestList([
                ...serosQuests.map((quest) => ({
                    value: he.decode(quest._id),
                    label: he.decode(quest.name),
                })),
            ]);
        }
    }, [serosQuests, questList, questUpdated]);

    // Close all categories when a new location is picked
    useEffect(() => {
        setShowSubLocations(false);
        setShowNPCs(false);
        setShowQuests(false);
    }, [locationNotes._id]);

    // Close Sub Location form if the parent category is closed
    useEffect(() => {
        if (showSubLocations === false) {
            setAddNewSubLocation(false);
        }
    }, [showSubLocations]);

    // Close Quest form if the parent category is closed
    useEffect(() => {
        if (showQuests === false) {
            setAddNewQuest(false);
        }
    }, [showQuests]);

    // Reset selected data when the "x" button is clicked at the top of the journal div
    const deselectLocation = () => {
        setLocationNotes(null);
        setLocationNPCs(null);
        setLocationQuests(null);
    };

    // If data hasn't been fetched yet, don't render data
    if (!dataFetched) {
        return <p>Loading...</p>;
    }

    // Render data
    return (
        <div
            id="location-notes-wrapper"
            style={{ backgroundImage: `url(./images/papyr.jpg)` }}
        >
            <div
                id="location-notes-title"
                style={{
                    backgroundImage: `url('images/${locationNotes.type}.png')`,
                    filter: 'blur("2000px")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            >
                <span className="location-notes-title-content-wrapper">
                    <h2>{he.decode(locationNotes.name)}</h2>
                    <FontAwesomeIcon
                        icon="times"
                        id="location-notes-deselect-location"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            deselectLocation();
                        }}
                    />
                </span>
            </div>
            <div id="location-notes-data">
                {locationNotes.desc === true ? (
                    <p>{he.decode(locationNotes.desc)}</p>
                ) : null}

                <SubLocationWrapper
                    showSubLocations={showSubLocations}
                    setShowSubLocations={setShowSubLocations}
                    locationNotes={locationNotes}
                    setDeleteData={setDeleteData}
                    inputStyles={inputStyles}
                    serosLocations={serosLocations}
                    setSerosLocations={setSerosLocations}
                    addNewSubLocation={addNewSubLocation}
                    setAddNewSubLocation={setAddNewSubLocation}
                />

                <NPCWrapper
                    showNPCs={showNPCs}
                    setShowNPCs={setShowNPCs}
                    locationNPCs={locationNPCs}
                    setDeleteData={setDeleteData}
                    questList={questList}
                    locationList={locationList}
                    inputStyles={inputStyles}
                    serosNPCs={serosNPCs}
                    setSerosNPCs={setSerosNPCs}
                    addNewNPC={addNewNPC}
                    setAddNewNPC={setAddNewNPC}
                />

                <QuestWrapper
                    showQuests={showQuests}
                    setShowQuests={setShowQuests}
                    locationQuests={locationQuests}
                    setDeleteData={setDeleteData}
                    locationList={locationList}
                    inputStyles={inputStyles}
                    serosQuests={serosQuests}
                    setSerosQuests={setSerosQuests}
                    setSerosNPCs={setSerosNPCs}
                    setQuestUpdated={setQuestUpdated}
                    addNewQuest={addNewQuest}
                    setAddNewQuest={setAddNewQuest}
                />
            </div>
        </div>
    );
};

export default LocationNotes;
