import React, { useState, useEffect } from "react";
import "./Journal.css";
import LocationNotes from "../LocationNotes/LocationNotes";
import JournalMenuHeaderBox from "../JournalMenu/JournalMenuHeaderBox";
import JournalMenuContent from "../JournalMenu/JournalMenuContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Journal = (props) => {
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
        deleteData,
        setDeleteData,
        userAuthenticated,
        setRenderCreationMarker,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerLatLng,
        setCreationMarkerType,
        map,
        markerBeingEdited,
        setMarkerBeingEdited,
        editLocationDetails,
        editMarkerLatLng,
        setEditMarkerType,
        dataNotifications,
        setDataNotifications,
        campaign,
        changelog,
        setChangelog,
        combatInstances,
        setCombatInstances,
        players,
        setPlayers,
        journalOpen,
        setJournalOpen,
    } = props;

    const [isOpen, setIsOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState("");

    // useEffect to toggle if the journal component is rendering or not
    useEffect(() => {
        if (selectedTab !== "") {
            setJournalOpen(true);
        } else {
            setJournalOpen(false);
        }
    }, [selectedTab, setJournalOpen]);

    // useEffect to render the frontpage when a user clicks delete location whilst location notes is not selected.
    useEffect(() => {
        if (locationNotes === null && deleteData !== null) {
            setSelectedTab("");
            return;
        }
    }, [deleteData, locationNotes]);

    useEffect(() => {
        if (markerBeingEdited !== null) {
            setSelectedTab("");
        }
    }, [markerBeingEdited]);

    if (Object.keys(userAuthenticated).length === 0) {
        return null;
    }

    const dropdownText = (string) => {
        return (
            <div
                className="dropdown-text-wrapper dropdown-pointer"
                onClick={() => {
                    setSelectedTab(string.toLowerCase());
                }}
            >
                <h2 className="dropdown-text">{string}</h2>
            </div>
        );
    };

    if (locationNotes !== null) {
        return (
            <div className="journal">
                <LocationNotes
                    locationNotes={locationNotes}
                    setLocationNotes={setLocationNotes}
                    npcs={npcs}
                    setNPCs={setNPCs}
                    locationNPCs={locationNPCs}
                    setLocationNPCs={setLocationNPCs}
                    locationQuests={locationQuests}
                    setLocationQuests={setLocationQuests}
                    locationCombatInstances={locationCombatInstances}
                    setLocationCombatInstances={setLocationCombatInstances}
                    locations={locations}
                    setLocations={setLocations}
                    quests={quests}
                    setQuests={setQuests}
                    setDeleteData={setDeleteData}
                    userAuthenticated={userAuthenticated}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    changelog={changelog}
                    setChangelog={setChangelog}
                    username={userAuthenticated.username}
                    combatInstances={combatInstances}
                    setCombatInstances={setCombatInstances}
                    players={players}
                    setPlayers={setPlayers}
                />
            </div>
        );
    }

    // If a location has not been selected yet, display the front page
    if (selectedTab === "") {
        return (
            <div
                id="dropdown-wrapper"
                className={`${isOpen === true ? "dropdown-main-open" : ""}`}
            >
                <div id="dropdown-main" className="dropdown-component">
                    {dropdownText("Changelog")}
                    {dropdownText("Locations")}
                    {dropdownText("NPCs")}
                    {dropdownText("Quests")}
                    {dropdownText("Instances")}
                </div>
                <div
                    id="dropdown-tab"
                    className="dropdown-component"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <FontAwesomeIcon
                        icon="chevron-down"
                        id="dropdown-fa-icon"
                        className={`dropdown-pointer ${
                            isOpen === true ? "dropdown-tab-open" : ""
                        }`}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </div>
            </div>
        );
    }

    if (selectedTab !== "") {
        return (
            <div id="journal-front-page-container" className="journal">
                {campaign === null ? null : (
                    <div id="journal-front-page-menu">
                        <div id="journal-front-page-menu-header">
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                selectedTabValue={"changelog"}
                                headerValue={"Changelog"}
                                iconValue={"hourglass"}
                                boxPosition={"instruction-header-box-borders"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                selectedTabValue={"locations"}
                                headerValue={"Location list"}
                                iconValue={"map-location-dot"}
                                boxPosition={"instruction-header-box-middle"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                selectedTabValue={"quests"}
                                headerValue={"Quest list"}
                                iconValue={"circle-exclamation"}
                                boxPosition={"instruction-header-box-borders"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                selectedTabValue={"npcs"}
                                headerValue={"NPC list"}
                                iconValue={"users"}
                                boxPosition={"instruction-header-box-middle"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                selectedTabValue={"instances"}
                                headerValue={"Combat Instances"}
                                iconValue={"chart-bar"}
                                boxPosition={"instruction-header-box-borders"}
                                markerBeingEdited={markerBeingEdited}
                            />
                        </div>
                        <JournalMenuContent
                            locations={locations}
                            setLocations={setLocations}
                            setLocationNotes={setLocationNotes}
                            userAuthenticated={userAuthenticated}
                            selectedTab={selectedTab}
                            quests={quests}
                            setQuests={setQuests}
                            npcs={npcs}
                            setNPCs={setNPCs}
                            renderCreationMarker={renderCreationMarker}
                            setRenderCreationMarker={setRenderCreationMarker}
                            creationMarkerLatLng={creationMarkerLatLng}
                            setCreationMarkerLatLng={setCreationMarkerLatLng}
                            setCreationMarkerType={setCreationMarkerType}
                            map={map}
                            markerBeingEdited={markerBeingEdited}
                            setMarkerBeingEdited={setMarkerBeingEdited}
                            editLocationDetails={editLocationDetails}
                            editMarkerLatLng={editMarkerLatLng}
                            setEditMarkerType={setEditMarkerType}
                            dataNotifications={dataNotifications}
                            setDataNotifications={setDataNotifications}
                            campaign={campaign}
                            changelog={changelog}
                            setChangelog={setChangelog}
                            combatInstances={combatInstances}
                            setCombatInstances={setCombatInstances}
                            journalOpen={journalOpen}
                            setJournalOpen={setJournalOpen}
                            setSelectedTab={setSelectedTab}
                        />
                    </div>
                )}
            </div>
        );
    }
};

export default Journal;
