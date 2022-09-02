import React from "react";
import "./Separator.css";

const Separator = () => {
    return (
        <div className="location-note-details-data-separator-wrapper">
            <svg
                height={5}
                width={520}
                className="location-notes-details-data-separator"
            >
                <polyline points="0,0 520,1.5 0,5"></polyline>
            </svg>
        </div>
    );
};

export default Separator;
