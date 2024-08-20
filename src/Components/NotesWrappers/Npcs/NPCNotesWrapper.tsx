import React, { useState, SetStateAction } from "react";

// Type imports
import type { NPC } from "../../../types";

// Style imports
import "../GenericStyles/NoteWrapper.css";

interface NPCNotesWrapperProps {
    npcs: NPC[];
    deleteData: NPC;
    setDeleteData: React.Dispatch<SetStateAction<NPC>>;
}

const NPCNotesWrapper: React.FC<NPCNotesWrapperProps> = (props) => {
    const { npcs, deleteData, setDeleteData } = props;

    const [showNPCs, setShowNPCs] = useState<boolean>(false);
    const [editNPC, setEditNPC] = useState<null | NPC>(null);

    return <div className="notes-wrapper"></div>;
};

export default NPCNotesWrapper;
