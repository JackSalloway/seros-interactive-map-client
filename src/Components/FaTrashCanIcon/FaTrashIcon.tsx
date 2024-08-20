import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Type imports
import type {
    Location,
    Sublocation,
    NPC,
    Quest,
    CombatInstance,
    DeleteItem,
} from "../../types";

interface FaTrashIconProps {
    item: null | DeleteItem;
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
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
