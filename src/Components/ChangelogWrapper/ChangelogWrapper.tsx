import React, { useState } from "react";

// Component imports
import ChangelogItem from "../ChangelogItem/ChangelogItem";
import FaChevronIcon from "../FaChevronIcon/FaChevronIcon";

// Style imports
import "./ChangelogWrapper.css";

// Type imports
import type { Changelog } from "../../types";

interface ChangelogWrapperProps {
    title: string;
    changelog: Changelog[];
}

const ChangelogWrapper: React.FC<ChangelogWrapperProps> = (props) => {
    const { title, changelog } = props;

    const [selected, setSelected] = useState<boolean>(false); // State for opening/closing list

    // Return the list of changelog entries or an element telling the user that no entries exist
    const renderContent = () => {
        return changelog.length > 0 ? (
            <div className="list-content">
                {changelog?.reverse().map((item) => {
                    return <ChangelogItem key={item.id} item={item} />;
                })}
            </div>
        ) : (
            <div className="list-content">
                <p>No entries found.</p>
            </div>
        );
    };

    return (
        <div
            className={`changelog-wrapper ${
                selected ? "changelog-wrapper-open" : "changelog-wrapper-closed"
            }`}
        >
            <div className="list-header">
                <h3>{title}</h3>
                <FaChevronIcon open={selected} toggleOpen={setSelected} />
            </div>
            {selected === true ? renderContent() : null}
        </div>
    );
};

export default ChangelogWrapper;
