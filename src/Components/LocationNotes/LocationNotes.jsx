import React, { useState, useEffect } from "react";
import "./LocationNotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { splitParas } from "../../imports/imports";

// Component imports
import SublocationWrapper from "./Sublocations/SublocationWrapper";
import NPCWrapper from "./NPCs/NPCWrapper";
import QuestWrapper from "./Quests/QuestWrapper";
import CombatInstancesWrapper from "./CombatInstances/CombatInstancesWrapper";

const LocationNotes = (props) => {
    const {
        locationNotes,
        setLocationNotes,
        npcs,
        setNPCs,
        locationNPCs,
        setLocationNPCs,
        locationQuests,
        setLocationQuests,
        locationCombatInstances,
        setLocationCombatInstances,
        locations,
        setLocations,
        quests,
        setQuests,
        setDeleteData,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
        combatInstances,
        setCombatInstances,
    } = props;

    // Set states
    const [dataFetched, setDataFetched] = useState(false);
    const [showSublocations, setShowSublocations] = useState(false);
    const [showNPCs, setShowNPCs] = useState(false);
    const [showQuests, setShowQuests] = useState(false);
    const [showCombatInstances, setShowCombatInstances] = useState(false);
    const [locationList, setLocationList] = useState([]); // Used for adding locations to new npcs/quests
    const [questList, setQuestList] = useState([]); // Used for adding quests to new npcs/locations

    // Sub Location states
    const [addNewSublocation, setAddNewSublocation] = useState(false);

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
        if (locationList.length !== locations.length) {
            setLocationList([
                ...locationList,
                ...locations.map((location) => ({
                    value: location.id,
                    label: he.decode(location.name),
                })),
            ]);
        }
    }, [locations, locationList]);

    // Populate questList with quests
    useEffect(() => {
        if (questList.length !== quests.length) {
            setQuestList([
                ...quests.map((quest) => ({
                    value: quest._id,
                    label: he.decode(quest.name),
                })),
            ]);
        }
    }, [quests, questList, questUpdated]);

    // Close all categories when a new location is picked
    useEffect(() => {
        setShowSublocations(false);
        setShowNPCs(false);
        setShowQuests(false);
        setShowCombatInstances(false);
    }, [locationNotes._id]);

    // Close Sub Location form if the parent category is closed
    useEffect(() => {
        if (showSublocations === false) {
            setAddNewSublocation(false);
        }
    }, [showSublocations]);

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
                <div className="location-notes-title-content-wrapper">
                    <h2>{he.decode(locationNotes.name)}</h2>
                    <FontAwesomeIcon
                        icon="times"
                        id="location-notes-deselect-location"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            deselectLocation();
                        }}
                    />
                </div>
            </div>
            <div id="location-notes-data" className="description-section">
                {locationNotes.description
                    ? splitParas(locationNotes.description).map(
                          (para, index) => (
                              <p
                                  className="location-notes-description-paragraph location-notes-location-description"
                                  key={index}
                              >
                                  {he.decode(para)}
                              </p>
                          )
                      )
                    : null}

                <SublocationWrapper
                    showSublocations={showSublocations}
                    setShowSublocations={setShowSublocations}
                    locationNotes={locationNotes}
                    setDeleteData={setDeleteData}
                    locations={locations}
                    setLocations={setLocations}
                    addNewSubLocation={addNewSublocation}
                    setAddNewSubLocation={setAddNewSublocation}
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
                    npcs={npcs}
                    setNPCs={setNPCs}
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
                    quests={quests}
                    setQuests={setQuests}
                    setNPCs={setNPCs}
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
                    combatInstances={combatInstances}
                    setCombatInstances={setCombatInstances}
                    addNewInstance={addNewInstance}
                    setAddNewInstance={setAddNewInstance}
                    locationNotes={locationNotes}
                    locationCombatInstances={locationCombatInstances}
                    setDeleteData={setDeleteData}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
            </div>
        </div>
    );
};

export default LocationNotes;
