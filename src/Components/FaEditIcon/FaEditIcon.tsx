import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Type imports
import type {
    Location,
    Sublocation,
    NPC,
    Quest,
    CombatInstance,
} from "../../types";

interface FaEditIconProps {
    // item: Location | Sublocation | NPC | Quest | CombatInstance;
    editing: null | Sublocation;
    setEditing: React.Dispatch<SetStateAction<null | Sublocation>>;
}

const FaEditIcon: React.FC<FaEditIconProps> = (props) => {
    return (
        <div>
            <FontAwesomeIcon
                icon="pencil"
                className="edit-button"
                onClick={() => {
                    window.alert("Edit functionality is not implemented yet!");
                    props.setEditing(props.item);
                }}
            />
        </div>
    );
};

export default FaEditIcon;
