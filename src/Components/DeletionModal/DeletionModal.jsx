import React, { useState, useEffect } from "react";
import "./DeletionModal.css";

// Component imports
import DeleteLocation from "./DeleteLocation";
import DeleteSubLocation from "./DeleteSubLocation";
import DeleteNPC from "./DeleteNPC";
import DeleteQuest from "./DeleteQuest";

const DeletionModal = (props) => {
    const {
        data,
        setDeleteData,
        selectedLocationNotes,
        serosLocations,
        setSerosLocations,
        serosNPCs,
        setSerosNPCs,
        serosQuests,
        setSerosQuests,
        dataNotifications,
        setDataNotifications,
    } = props;

    const [dataType, setDataType] = useState(null);

    useEffect(() => {
        if (Object.hasOwn(data, "marked") === true) {
            setDataType("Location");
        } else if (Object.hasOwn(data, "disposition") === true) {
            setDataType("NPC");
        } else if (Object.hasOwn(data, "completed") === true) {
            setDataType("Quest");
        } else {
            setDataType("Sub Location");
        }
    }, [data]);

    if (dataType === "Location") {
        return (
            <DeleteLocation
                data={data}
                setDeleteData={setDeleteData}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                setSerosNPCs={setSerosNPCs}
                setSerosQuests={setSerosQuests}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    } else if (dataType === "NPC") {
        return (
            <DeleteNPC
                data={data}
                setDeleteData={setDeleteData}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    } else if (dataType === "Quest") {
        return (
            <DeleteQuest
                data={data}
                setDeleteData={setDeleteData}
                serosQuests={serosQuests}
                setSerosQuests={setSerosQuests}
                setSerosNPCs={setSerosNPCs}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    } else if (dataType === "Sub Location") {
        return (
            <DeleteSubLocation
                data={data}
                setDeleteData={setDeleteData}
                selectedLocationNotes={selectedLocationNotes}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    }
};

export default DeletionModal;
