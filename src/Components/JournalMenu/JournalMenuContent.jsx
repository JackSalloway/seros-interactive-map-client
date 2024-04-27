import React from "react";
import "./JournalMenuContent.css";
import LocationListWrapper from "../LocationList/LocationListWrapper";
import QuestListWrapper from "../QuestList/QuestListWrapper";
import NPCListWrapper from "../NPCList/NPCListWrapper";
import ChangelogWrapper from "../ChangelogWrapper/ChangelogWrapper";
import EditLocation from "../EditLocation/EditLocation";
import FrontPageWrapper from "../FrontPageWrapper/FrontPageWrapper";
import CombatInstancesListWrapper from "../CombatInstanceList/CombatInstanceListWrapper";

const JournalMenuContent = (props) => {
    const {
        locations,
        setLocations,
        setLocationNotes,
        userAuthenticated,
        selectedTab,
        quests,
        setQuests,
        serosNPCs,
        setSerosNPCs,
        renderCreationMarker,
        setRenderCreationMarker,
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
        // setCombatInstanceData, - This is not used due to the locationless functionality for Combat Instances not being implemented as they cannot be deleted.
    } = props;

    if (markerBeingEdited !== null) {
        return (
            <EditLocation
                markerBeingEdited={markerBeingEdited}
                setMarkerBeingEdited={setMarkerBeingEdited}
                editLocationDetails={editLocationDetails}
                editMarkerLatLng={editMarkerLatLng}
                setEditMarkerType={setEditMarkerType}
                map={map}
                locations={locations}
                setLocations={setLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                setChangelogData={setChangelogData}
            />
        );
    }

    const ChangelogContent = () => {
        return (
            <ChangelogWrapper
                campaign={campaign}
                changelogData={changelogData}
                setChangelogData={setChangelogData}
            />
        );
    };

    const locationListContent = () => {
        return (
            <LocationListWrapper
                userAuthenticated={userAuthenticated}
                renderCreationMarker={renderCreationMarker}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerLatLng={setCreationMarkerLatLng}
                setCreationMarkerType={setCreationMarkerType}
                unfilteredSerosLocations={locations}
                locations={Array.from(locations)}
                setLocations={setLocations}
                setLocationNotes={setLocationNotes}
                map={map}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                setChangelogData={setChangelogData}
            />
        );
    };

    const questListContent = () => {
        return (
            <QuestListWrapper
                locations={locations}
                setLocationNotes={setLocationNotes}
                quests={quests}
                setQuests={setQuests}
                questsFiltered={Array.from(quests)}
                map={map}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                setChangelogData={setChangelogData}
            />
        );
    };

    const npcListContent = () => {
        return (
            <NPCListWrapper
                locations={locations}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                serosNPCsFiltered={Array.from(serosNPCs)}
                map={map}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                setChangelogData={setChangelogData}
            />
        );
    };

    const combatInstancesContent = () => {
        return (
            <CombatInstancesListWrapper
                locations={locations}
                setLocationNotes={setLocationNotes}
                combatInstanceData={combatInstances}
                combatInstanceDataFiltered={Array.from(
                    combatInstances
                ).reverse()}
                map={map}
                campaign={campaign}
            />
        );
    };

    const conditionalRender = () => {
        if (selectedTab === "Changelog") {
            return ChangelogContent();
        }

        if (selectedTab === "Location list") {
            return locationListContent();
        }

        if (selectedTab === "Quest list") {
            return questListContent();
        }

        if (selectedTab === "NPC list") {
            return npcListContent();
        }

        if (selectedTab === "Combat Instances") {
            return combatInstancesContent();
        }

        // No tab has been selected so return frontpage
        return <FrontPageWrapper campaign={campaign} />;
    };

    return (
        <div id="journal-front-page-menu-content">{conditionalRender()}</div>
    );
};

export default JournalMenuContent;
