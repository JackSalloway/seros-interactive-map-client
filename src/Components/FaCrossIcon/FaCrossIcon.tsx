import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Style imports
import "./FaCrossIcon.css";

interface FaCrossIconProps {
    deselect: React.Dispatch<SetStateAction<null | number>>;
}

const FaCrossIcon: React.FC<FaCrossIconProps> = (props) => {
    return (
        <div>
            <FontAwesomeIcon
                icon="times"
                className="deselect-button"
                onClick={() => {
                    props.deselect(null);
                }}
            />
        </div>
    );
};

export default FaCrossIcon;
