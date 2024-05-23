import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteNPC = (props) => {
    const {
        deleteData,
        setDeleteData,
        npcs,
        setNPCs,
        dataNotifications,
        setDataNotifications,
        changelog,
        setChangelog,
        username,
    } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    useEffect(() => {
        if (deletionString === he.decode(deleteData.name)) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [deleteData.name, deletionString]);

    const deleteNPC = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            npc_name: deleteData.name,
            npc_id: deleteData.id,
            username: username,
            campaign_id: deleteData.campaign.id,
        };

        const init = {
            method: "DELETE",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_npc`,
            init
        );
        const returnedData = await result.json();

        // setNPCs(returnedData);
        let npcsCopy = [...npcs];
        const npcToRemove = npcs.map((npc) => npc.id).indexOf(deleteData.id);
        npcsCopy.splice(npcToRemove, 1);
        setNPCs(npcsCopy);

        // Add a new notification showing an npc has been deleted
        const newNotification = {
            message: `NPC: ${deleteData.name}, successfully deleted.`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog
        setChangelog([...changelog, ...returnedData.changelogResult]);

        // De-render DeletionModal component
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
                            {he.decode(deleteData.name)}
                        </span>
                        ?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the NPC data and any relations it has to other
                        deleteData.
                    </p>
                </div>
                <div id="deletion-modal-p">
                    <p>
                        Please type{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        to confirm.
                    </p>
                </div>
                <form onSubmit={deleteNPC} id="deletion-modal-form">
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
