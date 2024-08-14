import React, { useState, useEffect, SetStateAction } from "react";
import he from "he";

// Component imports
import FaCrossIcon from "../FaCrossIcon/FaCrossIcon";

// Type imports
import type {
    Location,
    NPC,
    Quest,
    CombatInstance,
    SelectBoxValue,
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
    } = props;

    // Location tabs toggle states
    const [showSublocations, setShowSublocations] = useState<boolean>(false);
    const [showNPCs, setShowNPCs] = useState<boolean>(false);
    const [showQuests, setShowQuests] = useState<boolean>(false);
    const [showInstances, setShowInstances] = useState<boolean>(false);

    // List states for creating
    const [locationList, setLocationList] = useState<SelectBoxValue[]>([]); // Used for adding locations to new npcs/quests
    const [questList, setQuestList] = useState<SelectBoxValue[]>([]); // Used for adding quests to new npcs/locations

    // Sublocation states
    const [addNewSublocation, setAddNewSublocation] = useState<boolean>(false);

    // NPC states
    const [addNewNPC, setAddNewNPC] = useState<boolean>(false);

    // Quest states
    const [addNewQuest, setAddNewQuest] = useState<boolean>(false);
    const [questUpdated, setQuestUpdated] = useState<boolean>(false);

    // Combat Instance states
    const [addNewInstance, setAddNewInstance] = useState<boolean>(false);

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

    // Close all categories when a new location is picked
    useEffect(() => {
        setShowSublocations(false);
        setShowNPCs(false);
        setShowQuests(false);
        setShowInstances(false);
    }, [selectedLocation.id]);

    // Close Sublocation form if the parent component is closed
    useEffect(() => {
        if (showSublocations === false) {
            setAddNewSublocation(false);
        }
    }, [showSublocations]);

    // Close NPC form if the parent component is closed
    useEffect(() => {
        if (showNPCs === false) {
            setAddNewNPC(false);
        }
    }, [showNPCs]);

    // Close Quest form if the parent component is closed
    useEffect(() => {
        if (showQuests === false) {
            setAddNewQuest(false);
        }
    }, [showQuests]);

    // Close Combat Instance form if the parent component is closed
    useEffect(() => {
        if (showInstances === false) {
            setAddNewInstance(false);
        }
    }, [showInstances]);

    // Reset selected data when the "x" button is clicked at the top of the journal div
    const deselectLocation = () => {
        setSelectedLocationId(null);
    };

    return (
        <div id="journal-wrapper">
            <div id="journal-header-wrapper">
                {selectedLocation.name}
                <FaCrossIcon deselect={setSelectedLocationId} />
            </div>
        </div>
    );
};

export default JournalWrapper;
