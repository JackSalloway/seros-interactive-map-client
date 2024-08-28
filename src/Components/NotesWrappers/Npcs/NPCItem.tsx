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
import "./NPCItem.css";

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

    // useEffect to add an animation to the NPCItem components height when it opens and closes
    useEffect(() => {
        const item = npcItemRef.current;
        if (openNPC) {
            setHeight(`${item?.scrollHeight}px`);
        } else {
            setHeight("1.4rem"); // Height of the h4 element inside the note-item-header div
        }
    }, [openNPC]);

    const npcHeader = () => {
        if (openNPC === false) {
            return (
                <div className="note-item-header">
                    <h4>{he.decode(npc.name)}</h4>
                    <FaChevronIcon open={openNPC} toggleOpen={setOpenNPC} />
                </div>
            );
        } else {
            return (
                <div className="note-item-header">
                    <div className="npc-item-header-text">
                        <h4>{he.decode(npc.name)}</h4>
                        <p>
                            {he.decode(npc.race)}, {he.decode(npc.disposition)},{" "}
                            {he.decode(npc.status)}
                        </p>
                    </div>
                    <FaChevronIcon open={openNPC} toggleOpen={setOpenNPC} />
                    {openNPC ? (
                        <div className="note-item-header-icons">
                            <FaEditIcon
                                editing={editNPC}
                                setEditing={setEditNPC}
                            />
                            <FaTrashIcon
                                deleteData={deleteData}
                                setDeleteData={setDeleteData}
                            />
                        </div>
                    ) : null}
                </div>
            );
        }
    };

    const npcDescription = () => {
        return (
            <div className="note-item-content">
                <h5 className="note-item-content-header">Description:</h5>
                <p>{he.decode(npc.description)}</p>
            </div>
        );
    };

    const npcLocations = () => {
        return (
            <div className="note-item-content">
                <h5 className="note-item-content-header">
                    Associated Locations:
                </h5>
                {npc.associated_locations.map((location) => {
                    return <p key={location.id}>{he.decode(location.name)}</p>;
                })}
            </div>
        );
    };

    const npcQuests = () => {
        return (
            <div className="note-item-content">
                <h5 className="note-item-content-header">Associated Quests:</h5>
                {npc.associated_quests.length !== 0 ? (
                    npc.associated_quests.map((quest) => {
                        return <p key={quest.id}>{he.decode(quest.name)}</p>;
                    })
                ) : (
                    <p>No quests found...</p>
                )}
            </div>
        );
    };

    const npcContent = () => {
        if (openNPC === true) {
            return (
                <>
                    {npcDescription()}
                    {npcLocations()}
                    {npcQuests()}
                </>
            );
        } else return null;
    };

    return (
        <div
            ref={npcItemRef}
            className="note-item-wrapper"
            style={{ height: height }}
        >
            {npcHeader()}
            {npcContent()}
        </div>
    );
};

export default NPCItem;
