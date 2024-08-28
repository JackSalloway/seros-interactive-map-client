import React, { useState, SetStateAction } from "react";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaPlusIcon from "../../FaPlusIcon/FaPlusIcon";
import QuestItem from "./QuestItem";

// Type imports
import type { Quest, DeleteItem } from "../../../types";

// Style imports
import "../GenericStyles/NoteWrapper.css";

interface QuestNotesWrapper {
    quests: Quest[];
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const QuestNotesWrapper: React.FC<QuestNotesWrapper> = (props) => {
    const { quests, deleteData, setDeleteData } = props;

    const [showQuests, setShowQuests] = useState<boolean>(false);
    const [editQuest, setEditQuest] = useState<null | number>(null);
    const [addNewQuest, setAddNewQuest] = useState<boolean>(false);

    return (
        <div className="notes-wrapper">
            <div className="notes-wrapper-header">
                <h3>Quests</h3>
                <FaChevronIcon open={showQuests} toggleOpen={setShowQuests} />
            </div>
            {showQuests ? (
                <div className="notes-wrapper-content">
                    <div className="notes-wrapper-content-icons">
                        Add a new Quest!
                        <FaPlusIcon setAddNew={setAddNewQuest} />
                    </div>
                    <div className="notes-wrapper-content-list">
                        {quests?.map((quest) => {
                            return (
                                <QuestItem
                                    key={quest.id}
                                    quest={quest}
                                    editQuest={editQuest}
                                    setEditQuest={setEditQuest}
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

export default QuestNotesWrapper;
