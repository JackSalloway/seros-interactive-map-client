import React, { useState, useEffect } from "react";
import "./LocationNotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { splitParas } from "../../imports/imports";

// Component imports
import SubLocationWrapper from "./SubLocations/SubLocationWrapper";
import NPCWrapper from "./NPCs/NPCWrapper";
import QuestWrapper from "./Quests/QuestWrapper";
import CombatInstancesWrapper from "./CombatInstances/CombatInstancesWrapper";

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
        locationCombatInstances,
        setLocationCombatInstances,
        serosLocations,
        setSerosLocations,
        serosQuests,
        setSerosQuests,
        setDeleteData,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
        combatInstanceData,
        setCombatInstanceData,
    } = props;

    // Set states
    const [dataFetched, setDataFetched] = useState(false);
    const [showSubLocations, setShowSubLocations] = useState(false);
    const [showNPCs, setShowNPCs] = useState(false);
    const [showQuests, setShowQuests] = useState(false);
    const [showCombatInstances, setShowCombatInstances] = useState(false);
    const [locationList, setLocationList] = useState([]); // Used for adding locations to new npcs/quests
    const [questList, setQuestList] = useState([]); // Used for adding quests to new npcs/locations

    // Sub Location states
    const [addNewSubLocation, setAddNewSubLocation] = useState(false);

    // NPC states
    const [addNewNPC, setAddNewNPC] = useState(false);

    // Quest states
    const [addNewQuest, setAddNewQuest] = useState(false);
    const [questUpdated, setQuestUpdated] = useState(false);

    // Combat Instance states
    const [addNewInstance, setAddNewInstance] = useState(false);

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
        setShowCombatInstances(false);
    }, [locationNotes._id]);

    // Close Sub Location form if the parent category is closed
    useEffect(() => {
        if (showSubLocations === false) {
            setAddNewSubLocation(false);
        }
    }, [showSubLocations]);

    // Close NPC form if the parent category is closed
    useEffect(() => {
        if (showNPCs === false) {
            setAddNewNPC(false);
        }
    }, [showNPCs]);

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
        setLocationCombatInstances(null);
    };

    // If data hasn't been fetched yet, don't render data
    if (!dataFetched) {
        return <p>Loading...</p>;
    }

    // Render data
    return (
        <div id="location-notes-wrapper">
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
            <div id="location-notes-data" className="description-section">
                {locationNotes.desc
                    ? splitParas(locationNotes.desc).map((para, index) => (
                          <p
                              className="location-notes-description-paragraph location-notes-location-description"
                              key={index}
                          >
                              {he.decode(para)}
                          </p>
                      ))
                    : null}

                <SubLocationWrapper
                    showSubLocations={showSubLocations}
                    setShowSubLocations={setShowSubLocations}
                    locationNotes={locationNotes}
                    setDeleteData={setDeleteData}
                    serosLocations={serosLocations}
                    setSerosLocations={setSerosLocations}
                    addNewSubLocation={addNewSubLocation}
                    setAddNewSubLocation={setAddNewSubLocation}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />

                <NPCWrapper
                    locationNotes={locationNotes}
                    showNPCs={showNPCs}
                    setShowNPCs={setShowNPCs}
                    locationNPCs={locationNPCs}
                    setDeleteData={setDeleteData}
                    questList={questList}
                    locationList={locationList}
                    serosNPCs={serosNPCs}
                    setSerosNPCs={setSerosNPCs}
                    addNewNPC={addNewNPC}
                    setAddNewNPC={setAddNewNPC}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />

                <QuestWrapper
                    locationNotes={locationNotes}
                    showQuests={showQuests}
                    setShowQuests={setShowQuests}
                    locationQuests={locationQuests}
                    setDeleteData={setDeleteData}
                    locationList={locationList}
                    serosQuests={serosQuests}
                    setSerosQuests={setSerosQuests}
                    setSerosNPCs={setSerosNPCs}
                    setQuestUpdated={setQuestUpdated}
                    addNewQuest={addNewQuest}
                    setAddNewQuest={setAddNewQuest}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />

                <CombatInstancesWrapper
                    showCombatInstances={showCombatInstances}
                    setShowCombatInstances={setShowCombatInstances}
                    combatInstanceData={combatInstanceData}
                    setCombatInstanceData={setCombatInstanceData}
                    addNewInstance={addNewInstance}
                    setAddNewInstance={setAddNewInstance}
                    locationNotes={locationNotes}
                    locationCombatInstances={locationCombatInstances}
                    setDeleteData={setDeleteData}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />
            </div>
        </div>
    );
};

export default LocationNotes;
