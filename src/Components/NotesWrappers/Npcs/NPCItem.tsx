import React, { useState, useEffect, useRef, SetStateAction } from "react";
import he from "he";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaEditIcon from "../../FaEditIcon/FaEditIcon";
import FaTrashIcon from "../../FaTrashCanIcon/FaTrashIcon";

// Type imports
import type { NPC, DeleteItem } from "../../../types";

// Style imports
import "../GenericStyles/NoteItem.css";

interface NPCItem {
    npc: NPC;
    editNPC: null | number;
    setEditNPC: React.Dispatch<SetStateAction<null | number>>;
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const NPCItem: React.FC<NPCItem> = (props) => {
    const { npc, editNPC, setEditNPC, deleteData, setDeleteData } = props;

    const [openNPC, setOpenNPC] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("auto");

    const npcItemRef = useRef<null | HTMLDivElement>(null);

    // useEffect to add an animation to the SublocationItem components height when it opens and closes
    useEffect(() => {
        const item = npcItemRef.current;
        if (openNPC) {
            setHeight(`${item?.scrollHeight}px`);
        } else {
            setHeight("1.4rem"); // Height of the h4 element inside the note-item-header div
        }
    }, [openNPC]);

    const npcHeader = () => {
        return (
            <div className="note-item-header">
                <h4>{he.decode(npc.name)}</h4>
                <FaChevronIcon open={openNPC} toggleOpen={setOpenNPC} />
                {openNPC ? (
                    <div className="note-item-header-icons">
                        <FaEditIcon editing={editNPC} setEditing={setEditNPC} />
                        <FaTrashIcon
                            deleteData={deleteData}
                            setDeleteData={setDeleteData}
                        />
                    </div>
                ) : null}
            </div>
        );
    };

    return (
        <div
            ref={npcItemRef}
            className="note-item-wrapper"
            style={{ height: height }}
        >
            {npcHeader()}
        </div>
    );
};

export default NPCItem;
