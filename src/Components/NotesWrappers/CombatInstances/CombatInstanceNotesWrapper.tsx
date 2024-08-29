import React, { SetStateAction } from "react";

// Type imports
import type { CombatInstance, DeleteItem } from "../../../types";

interface CombatInstanceNotesWrapperProps {
    instances: CombatInstance[];
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const CombatInstanceNotesWrapper: React.FC<CombatInstanceNotesWrapperProps> = (
    props
) => {
    const { instances, deleteData, setDeleteData } = props;

    return <div></div>;
};

export default CombatInstanceNotesWrapper;
