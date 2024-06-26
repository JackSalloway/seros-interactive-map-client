import React, { useState, useEffect } from "react";
import "./DeletionModal.css";

// Component imports
import DeleteLocation from "./DeleteLocation";
import DeleteSubLocation from "./DeleteSubLocation";
import DeleteNPC from "./DeleteNPC";
import DeleteQuest from "./DeleteQuest";
import DeleteCombatInstance from "./DeleteCombatInstance";

const DeletionModal = (props) => {
    const {
        deleteData,
        setDeleteData,
        selectedLocationNotes,
        locations,
        setLocations,
        npcs,
        setNPCs,
        quests,
        setQuests,
        combatInstances,
        setCombatInstances,
        dataNotifications,
        setDataNotifications,
        username,
        changelog,
        setChangelog,
    } = props;

    const [dataType, setDataType] = useState(null);

    useEffect(() => {
        if (Object.hasOwn(deleteData, "marked") === true) {
            setDataType("Location");
        } else if (Object.hasOwn(deleteData, "disposition") === true) {
            setDataType("NPC");
        } else if (Object.hasOwn(deleteData, "completed") === true) {
            setDataType("Quest");
        } else if (Object.hasOwn(deleteData, "players") === true) {
            setDataType("Combat Instance");
        } else {
            setDataType("Sub Location");
        }
    }, [deleteData]);

    if (dataType === "Location") {
        return (
            <DeleteLocation
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                locations={locations}
                setLocations={setLocations}
                setNPCs={setNPCs}
                setQuests={setQuests}
                setCombatInstances={setCombatInstances}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                username={username}
                changelog={changelog}
                setChangelog={setChangelog}
            />
        );
    } else if (dataType === "NPC") {
        return (
            <DeleteNPC
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                npcs={npcs}
                setNPCs={setNPCs}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                username={username}
                changelog={changelog}
                setChangelog={setChangelog}
            />
        );
    } else if (dataType === "Quest") {
        return (
            <DeleteQuest
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                quests={quests}
                setQuests={setQuests}
                setNPCs={setNPCs}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                username={username}
                changelog={changelog}
                setChangelog={setChangelog}
            />
        );
    } else if (dataType === "Combat Instance") {
        return (
            <DeleteCombatInstance
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                combatInstances={combatInstances}
                setCombatInstances={setCombatInstances}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                changelog={changelog}
                setChangelog={setChangelog}
                username={username}
            />
        );
    } else if (dataType === "Sub Location") {
        return (
            <DeleteSubLocation
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                selectedLocationNotes={selectedLocationNotes}
                locations={locations}
                setLocations={setLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                username={username}
                changelog={changelog}
                setChangelog={setChangelog}
            />
        );
    }
};

export default DeletionModal;
