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

interface FaTrashIconProps {
    item: Location | Sublocation | NPC | Quest | CombatInstance;
    deleteData: Location | Sublocation | NPC | Quest | CombatInstance;
    setDeleteData: React.Dispatch<
        SetStateAction<Location | Sublocation | NPC | Quest | CombatInstance>
    >;
}

const FaTrashIcon: React.FC<FaTrashIconProps> = (props) => {
    return (
        <div>
            <FontAwesomeIcon
                icon="trash-can"
                className="delete-button"
                onClick={() => {
                    window.alert(
                        "Delete functionality is not implemented yet!"
                    );
                    // props.setDeleteData(props.item);
                }}
            />
        </div>
    );
};

export default FaTrashIcon;
