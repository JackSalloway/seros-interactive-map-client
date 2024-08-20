import React, { useState, useEffect, SetStateAction } from "react";
import he from "he";

// Component imports
import FaCrossIcon from "../FaCrossIcon/FaCrossIcon";
import SublocationNotesWrapper from "../NotesWrappers/Sublocations/SublocationNotesWrapper";
import NPCNotesWrapper from "../NotesWrappers/Npcs/NPCNotesWrapper";

// Type imports
import type {
    Location,
    Sublocation,
    NPC,
    Quest,
    CombatInstance,
    SelectBoxValue,
    DeleteItem,
} from "../../types";

// Style imports
import "./JournalWrapper.css";

interface JournalWrapperProps {
    selectedLocation: Location;
    setSelectedLocationId: React.Dispatch<SetStateAction<null | number>>;
    selectedNPCs: NPC[];
    selectedQuests: Quest[];
    selectedInstances: CombatInstance[];
    locations: Location[];
    npcs: NPC[];
    quests: Quest[];
    instances: CombatInstance[];
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const JournalWrapper: React.FC<JournalWrapperProps> = (props) => {
    const {
        selectedLocation,
        setSelectedLocationId,
        selectedNPCs,
        selectedQuests,
        selectedInstances,
        locations,
        npcs,
        quests,
        instances,
        deleteData,
        setDeleteData,
    } = props;

    // List states
    const [locationList, setLocationList] = useState<SelectBoxValue[]>([]); // Used for adding locations to new npcs/quests
    const [questList, setQuestList] = useState<SelectBoxValue[]>([]); // Used for adding quests to new npcs/locations

    const [questUpdated, setQuestUpdated] = useState<boolean>(false);

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
                    value: quest.id,
                    label: he.decode(quest.name),
                })),
            ]);
        }
    }, [quests, questList, questUpdated]);

    return (
        <div id="journal-wrapper">
            <div id="journal-header-wrapper">
                {" "}
                {he.decode(selectedLocation.name)}
                <FaCrossIcon deselect={setSelectedLocationId} />
            </div>
            <div className="journal-notes-wrapper">
                <SublocationNotesWrapper
                    sublocations={selectedLocation.sublocations}
                    deleteData={deleteData}
                    setDeleteData={setDeleteData}
                />
            </div>
            <div className="journal-notes-wrapper">
                <NPCNotesWrapper
                    npcs={selectedNPCs}
                    deleteData={deleteData}
                    setDeleteData={setDeleteData}
                />
            </div>
        </div>
    );
};

export default JournalWrapper;
