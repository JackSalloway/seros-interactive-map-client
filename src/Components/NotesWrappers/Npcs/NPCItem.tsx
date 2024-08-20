import React, { SetStateAction } from "react";

// Type imports
import type { NPC, DeleteItem } from "../../../types";

// Style imports
import "../GenericStyles/NoteItem.css";

interface NPCItem {
    npc: NPC;
    editNPC: null | NPC;
    setEditNPC: React.Dispatch<SetStateAction<null | NPC>>;
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const NPCItem: React.FC<NPCItem> = (props) => {
    return <div></div>;
};

export default NPCItem;
