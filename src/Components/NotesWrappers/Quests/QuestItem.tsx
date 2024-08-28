import React, { useState, useEffect, useRef, SetStateAction } from "react";
import he from "he";
import { splitParas } from "../../../imports/imports";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaEditIcon from "../../FaEditIcon/FaEditIcon";
import FaTrashIcon from "../../FaTrashCanIcon/FaTrashIcon";

// Type imports
import type { Quest, DeleteItem } from "../../../types";

// Style import
import "../GenericStyles/NoteItem.css";

interface QuestItem {
    quest: Quest;
    editQuest: null | number;
    setEditQuest: React.Dispatch<SetStateAction<null | number>>;
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const QuestItem: React.FC<QuestItem> = (props) => {
    const { quest, editQuest, setEditQuest, deleteData, setDeleteData } = props;

    const [openQuest, setOpenQuest] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("auto");

    const questItemRef = useRef<null | HTMLDivElement>(null);

    // useEffect to add an animation to the QuestItem components height when it opens and closes
    useEffect(() => {
        const item = questItemRef.current;
        if (openQuest) {
            setHeight(`${item?.scrollHeight}px`);
        } else {
            setHeight("1.4rem"); // Height of the h4 element inside the note-item-header div
        }
    }, [openQuest]);

    const questHeader = () => {
        if (openQuest === false) {
            return (
                <div className="note-item-header">
                    <h4>{he.decode(quest.name)}</h4>
                    <FaChevronIcon open={openQuest} toggleOpen={setOpenQuest} />
                </div>
            );
        } else {
            return (
                <div className="note-item-header">
                    <div className="note-item-header-text">
                        <h4>{he.decode(quest.name)}</h4>
                        <p>
                            Quest{" "}
                            {quest.completed ? "Completed!" : "Incomplete"}
                        </p>
                    </div>
                    <FaChevronIcon open={openQuest} toggleOpen={setOpenQuest} />
                    <div className="note-item-header-icons">
                        <FaEditIcon
                            editing={editQuest}
                            setEditing={setEditQuest}
                        />
                        <FaTrashIcon
                            deleteData={deleteData}
                            setDeleteData={setDeleteData}
                        />
                    </div>
                </div>
            );
        }
    };

    const questDescription = () => {
        return (
            <div className="note-item-content">
                <h5 className="note-item-content-header">Description:</h5>
                <div className="note-item-content-description">
                    {splitParas(quest.description).map(
                        (para: string, index: number) => {
                            return <p key={index}>{he.decode(para)}</p>;
                        }
                    )}
                </div>
            </div>
        );
    };

    const questLocations = () => {
        return (
            <div className="note-item-content">
                <h5 className="note-item-content-header">
                    Associated Locations:
                </h5>
                <div className="note-item-content-associated">
                    {quest.associated_locations.map((location) => {
                        return (
                            <p key={location.id}>{he.decode(location.name)}</p>
                        );
                    })}
                </div>
            </div>
        );
    };

    const questContent = () => {
        if (openQuest === true) {
            return (
                <>
                    {questDescription()}
                    {questLocations()}
                </>
            );
        } else return null;
    };

    return (
        <div
            ref={questItemRef}
            className="note-item-wrapper"
            style={{ height: height }}
        >
            {questHeader()}
            {questContent()}
        </div>
    );
};

export default QuestItem;
