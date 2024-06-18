import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // Style imports
import "./FaChevronIcon.css";

interface FaChevronIconProps {
    open: boolean;
    toggleOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FaChevronIcon: React.FC<FaChevronIconProps> = (props) => {
    return (
        <div>
            <FontAwesomeIcon
                className={`chevron-icon ${
                    props.open === true ? "rotate-180" : ""
                }`}
                icon="chevron-down"
                onClick={() => {
                    props.toggleOpen(!props.open);
                }}
            />
        </div>
    );
};

export default FaChevronIcon;
