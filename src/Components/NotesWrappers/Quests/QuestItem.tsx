import React, { SetStateAction } from "react";

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
    const {} = props;

    return <div></div>;
};

export default QuestItem;
