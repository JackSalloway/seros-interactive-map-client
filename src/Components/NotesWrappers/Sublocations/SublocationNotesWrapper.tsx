import React, { useState, SetStateAction } from "react";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaPlusIcon from "../../FaPlusIcon/FaPlusIcon";
import SublocationItem from "./SublocationItem";

// Type imports
import type { Sublocation, DeleteItem } from "../../../types";

interface SublocationNotesWrapperProps {
    sublocations: Sublocation[];
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

// Style imports
import "../GenericStyles/NoteWrapper.css";

const SublocationNotesWrapper: React.FC<SublocationNotesWrapperProps> = (
    props
) => {
    const { sublocations, deleteData, setDeleteData } = props;

    const [showSublocations, setShowSublocations] = useState<boolean>(false);
    const [editSublocation, setEditSublocation] = useState<null | Sublocation>(
        null
    );
    const [addNewSublocation, setAddNewSublocation] = useState<boolean>(false);

    return (
        <div className="notes-wrapper">
            <div className="notes-wrapper-header">
                <h3>Sublocations</h3>
                <FaChevronIcon
                    open={showSublocations}
                    toggleOpen={setShowSublocations}
                />
            </div>
            {showSublocations ? (
                <div className="notes-wrapper-content">
                    <div className="notes-wrapper-content-icons">
                        Add a new Sublocation!
                        <FaPlusIcon setAddNew={setAddNewSublocation} />
                    </div>
                    <div className="notes-wrapper-content-list">
                        {sublocations?.map((sublocation) => {
                            return (
                                <SublocationItem
                                    key={sublocation.id}
                                    sublocation={sublocation}
                                    editSublocation={editSublocation}
                                    setEditSublocation={setEditSublocation}
                                    deleteData={deleteData}
                                    setDeleteData={setDeleteData}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SublocationNotesWrapper;
