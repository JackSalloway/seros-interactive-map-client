import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteNPC = (props) => {
    const { data, setDeleteData, serosNPCs, setSerosNPCs } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    useEffect(() => {
        if (deletionString === he.decode(data.name)) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [data.name, deletionString]);

    const deleteData = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            data_name: data.name,
            data_id: data._id,
        };

        const init = {
            method: "DELETE",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };
        await fetch(`${process.env.REACT_APP_API_URL}/delete_npc`, init);
        // const returnedData = await result.json();
        // setSerosNPCs(returnedData);
        let serosNPCsCopy = [...serosNPCs];
        const npcToRemove = serosNPCs.map((npc) => npc._id).indexOf(data._id);
        serosNPCsCopy.splice(npcToRemove, 1);
        setSerosNPCs(serosNPCsCopy);
        setDeleteData(null);
    };

    return (
        <div>
            <div id="deletion-modal-blur"></div>
            <div id="deletion-modal">
                <FontAwesomeIcon
                    icon="fa-times"
                    className="deletion-modal-fa-icon location-notes-fa-cross"
                    onClick={() => {
                        setDeleteData(null);
                    }}
                />
                <h1>Delete NPC data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete{" "}
                        <span className="data-to-delete">
                            {he.decode(data.name)}
                        </span>
                        ?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the NPC data and any relations it has to other
                        data.
                    </p>
                </div>
                <div id="deletion-modal-p">
                    <p>
                        Please type{" "}
                        <span className="data-to-delete">
                            {he.decode(data.name)}
                        </span>{" "}
                        to confirm.
                    </p>
                </div>
                <form onSubmit={deleteData} id="deletion-modal-form">
                    <input
                        type="text"
                        onChange={({ target }) => {
                            setDeletionString(he.decode(target.value));
                        }}
                    />
                    <button disabled={deleteDisabled === true ? false : true}>
                        I understand what I am doing. Delete data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteNPC;
