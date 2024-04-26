import React, { useState, useEffect } from "react";
import "./Journal.css";
import LocationNotes from "../LocationNotes/LocationNotes";
import JournalMenuHeaderBox from "../JournalMenu/JournalMenuHeaderBox";
import JournalMenuContent from "../JournalMenu/JournalMenuContent";

const Journal = (props) => {
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
        changelogData,
        setChangelogData,
        combatInstances,
        setCombatInstances,
    } = props;

    const [selectedTab, setSelectedTab] = useState("Front Page");

    // useEffect to render the changelog section (frontpage) when a user clicks delete location whilst location notes is not selected.
    useEffect(() => {
        if (locationNotes === null && deleteData !== null) {
            setSelectedTab("Front Page");
            return;
        }
    }, [deleteData, locationNotes]);

    useEffect(() => {
        if (markerBeingEdited !== null) {
            setSelectedTab("Front Page");
        }
    }, [markerBeingEdited]);

    if (Object.keys(userAuthenticated).length === 0) {
        return null;
    }

    // If a location has not been selected yet, display the front page
    if (locationNotes === null) {
        return (
            <div id="journal-front-page-container" className="journal">
                {campaign === null ? null : (
                    <div id="journal-front-page-menu">
                        <div id="journal-front-page-menu-header">
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"Changelog"}
                                iconValue={"hourglass"}
                                boxPosition={"instruction-header-box-borders"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"Location list"}
                                iconValue={"map-location-dot"}
                                boxPosition={"instruction-header-box-middle"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"Quest list"}
                                iconValue={"circle-exclamation"}
                                boxPosition={"instruction-header-box-borders"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                headerValue={"NPC list"}
                                iconValue={"users"}
                                boxPosition={"instruction-header-box-middle"}
                                markerBeingEdited={markerBeingEdited}
                            />
                            <JournalMenuHeaderBox
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
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
                            serosNPCs={serosNPCs}
                            setSerosNPCs={setSerosNPCs}
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
                            changelogData={changelogData}
                            setChangelogData={setChangelogData}
                            combatInstances={combatInstances}
                            setCombatInstances={setCombatInstances}
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="journal">
            <LocationNotes
                locationNotes={locationNotes}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                locationNPCs={locationNPCs}
                setLocationNPCs={setLocationNPCs}
                locationQuests={locationQuests}
                setLocationQuests={setLocationQuests}
                locationCombatInstances={locationCombatInstances}
                setLocationCombatInstances={setLocationCombatInstances}
                locations={locations}
                setLocations={setLocations}
                quests={quests}
                setQuest={setQuests}
                setDeleteData={setDeleteData}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                setChangelogData={setChangelogData}
                username={userAuthenticated.username}
                combatInstances={combatInstances}
                setCombatInstances={setCombatInstances}
            />
        </div>
    );
};

export default Journal;
