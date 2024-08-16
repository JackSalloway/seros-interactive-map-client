import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FaPlusIconProps {
    setAddNew: React.Dispatch<SetStateAction<boolean>>;
}

const FaPlusIcon: React.FC<FaPlusIconProps> = (props) => {
    return (
        <div>
            <FontAwesomeIcon
                icon="plus"
                className="plus-button"
                onClick={() => {
                    props.setAddNew(true);
                }}
            />
        </div>
    );
};

export default FaPlusIcon;
