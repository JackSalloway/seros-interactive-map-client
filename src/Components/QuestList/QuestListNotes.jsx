import React from "react";
import he from "he";
import "./QuestListNotes.css";

const QuestListNotes = (props) => {
    const { quest } = props;
    return (
        <div>
            <p style={{ color: quest.completed === true ? "green" : "red" }}>
                {he.decode(quest.name)}
            </p>
        </div>
    );
};

export default QuestListNotes;
