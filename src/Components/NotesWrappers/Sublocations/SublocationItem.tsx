import React, { useState, useEffect, useRef, SetStateAction } from "react";
import he from "he";
import { splitParas } from "../../../imports/imports";

// Component imports
import FaChevronIcon from "../../FaChevronIcon/FaChevronIcon";
import FaEditIcon from "../../FaEditIcon/FaEditIcon";
import FaTrashIcon from "../../FaTrashCanIcon/FaTrashIcon";

// Type imports
import type { Sublocation, DeleteItem } from "../../../types";

// Style imports
import "../GenericStyles/NoteItem.css";

interface SublocationItemProps {
    sublocation: Sublocation;
    editSublocation: null | number;
    setEditSublocation: React.Dispatch<SetStateAction<null | number>>;
    deleteData: null | DeleteItem;
    setDeleteData: React.Dispatch<SetStateAction<null | DeleteItem>>;
}

const SublocationItem: React.FC<SublocationItemProps> = (props) => {
    const {
        sublocation,
        editSublocation,
        setEditSublocation,
        deleteData,
        setDeleteData,
    } = props;

    const [openSublocation, setOpenSublocation] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("auto");

    const sublocationItemRef = useRef<null | HTMLDivElement>(null);

    // useEffect to add an animation to the SublocationItem components height when it opens and closes
    useEffect(() => {
        const item = sublocationItemRef.current;
        if (openSublocation) {
            setHeight(`${item?.scrollHeight}px`);
        } else {
            setHeight("1.4rem"); // Height of the h4 element inside the note-item-header div
        }
    }, [openSublocation]);

    const sublocationHeader = () => {
        return (
            <div className="note-item-header">
                <h4>{he.decode(sublocation.name)}</h4>
                <FaChevronIcon
                    open={openSublocation}
                    toggleOpen={setOpenSublocation}
                />
                {openSublocation ? (
                    <div className="note-item-header-icons">
                        <FaEditIcon
                            // item={sublocation}
                            editing={editSublocation}
                            setEditing={setEditSublocation}
                        />
                        <FaTrashIcon
                            // item={sublocation}
                            deleteData={deleteData}
                            setDeleteData={setDeleteData}
                        />
                    </div>
                ) : null}
            </div>
        );
    };

    const sublocationContent = () => {
        return openSublocation ? (
            <div className="note-item-content">
                <h5 className="note-item-content-header">Description</h5>
                <div className="note-item-content-description">
                    {splitParas(sublocation.description).map(
                        (para: string, index: number) => {
                            return <p key={index}>{he.decode(para)}</p>;
                        }
                    )}
                </div>
            </div>
        ) : null;
    };

    return (
        <div
            ref={sublocationItemRef}
            className="note-item-wrapper"
            style={{ height: height }}
        >
            {sublocationHeader()}
            {sublocationContent()}
        </div>
    );
};

export default SublocationItem;
