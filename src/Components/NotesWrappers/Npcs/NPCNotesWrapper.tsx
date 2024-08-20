import React, { useState, SetStateAction } from "react";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaPlusIcon from "../../FaPlusIcon/FaPlusIcon";
import NPCItem from "./NPCItem";

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
    const [addNewNPC, setAddNewNPC] = useState<boolean>(false);

    return (
        <div className="notes-wrapper">
            <div className="notes-wrapper-header">
                <h3>NPCs</h3>
                <FaChevronIcon open={showNPCs} toggleOpen={setShowNPCs} />
            </div>
            {showNPCs ? (
                <div className="notes-wrapper-content">
                    <div className="notes-wrapper-content-icons">
                        Add a new Sublocation!
                        <FaPlusIcon setAddNew={setAddNewNPC} />
                    </div>
                    <div className="notes-wrapper-content-list">
                        {npcs?.map((npc) => {
                            return (
                                <NPCItem
                                    key={npc.id}
                                    npc={npc}
                                    editNPC={editNPC}
                                    setEditNPC={setEditNPC}
                                    deleteData={deleteData}
                                    setDeleteData={setDeleteData}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default NPCNotesWrapper;
