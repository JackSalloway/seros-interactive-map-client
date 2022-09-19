import React, { useState } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./QuestListNotes.css";

const QuestListNotes = (props) => {
    const { quest } = props;

    const [hover, setHover] = useState(false);
    const [selected, setSelected] = useState(false);

    const expandDownChevron = (
        <FontAwesomeIcon
            icon="chevron-down"
            className="journal-fa-icon"
            onClick={() => {
                setSelected(!selected);
            }}
        />
    );

    return (
        <div
            className="quest-list-notes-individual"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p style={{ color: quest.completed === true ? "green" : "red" }}>
                {he.decode(quest.name)}
            </p>
            {hover === true ? expandDownChevron : null}
        </div>
    );
};

export default QuestListNotes;
