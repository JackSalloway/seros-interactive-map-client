import React, { useState } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NPCListNotes.css";

const NPCListNotes = (props) => {
    const { npc } = props;

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
            className="npc-list-notes-individual"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p
                style={{
                    color: npc.disposition === "Friendly" ? "green" : "red",
                }}
            >
                {he.decode(npc.name)}
            </p>
            {hover === true ? expandDownChevron : null}
        </div>
    );
};

export default NPCListNotes;
