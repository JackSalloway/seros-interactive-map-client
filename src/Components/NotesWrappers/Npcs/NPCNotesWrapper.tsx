import React, { useState, SetStateAction } from "react";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";

// Type imports
import type { NPC, DeleteItem } from "../../../types";

// Style imports
import "../GenericStyles/NoteWrapper.css";

interface NPCNotesWrapperProps {
    npcs: NPC[];
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const NPCNotesWrapper: React.FC<NPCNotesWrapperProps> = (props) => {
    const { npcs, deleteData, setDeleteData } = props;

    const [showNPCs, setShowNPCs] = useState<boolean>(false);
    const [editNPC, setEditNPC] = useState<null | NPC>(null);

    return (
        <div className="notes-wrapper">
            <div className="notes-wrapper-header">
                <h3>NPCs</h3>
                <FaChevronIcon open={showNPCs} toggleOpen={setShowNPCs} />
            </div>
        </div>
    );
};

export default NPCNotesWrapper;
