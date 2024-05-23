import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteCombatInstance = (props) => {
    const {
        deleteData,
        setDeleteData,
        combatInstances,
        setCombatInstances,
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

    const deleteCombatInstance = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            combat_instance_name: deleteData.name,
            combat_instance_id: deleteData.id,
            username: username,
            campaign_id: deleteData.campaign.id,
        };

        const init = {
            method: "DELETE",
            headers: { "Content-type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_combat_instance`,
            init
        );
        const returnedData = await result.json();

        // Remove combat instance from combat instance list
        const combatInstancesCopy = [...combatInstances];
        const instanceToRemove = combatInstances
            .map((instance) => instance.id)
            .indexOf(deleteData.id);
        combatInstancesCopy.splice(instanceToRemove, 1);
        setCombatInstances(combatInstancesCopy);

        // Add a new notification showing a combat instance has been deleted
        const newNotification = {
            message: `Combat instance: ${deleteData.name}, successfully deleted.`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog
        setChangelog([...changelog, returnedData.changelogResult]);

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

                <h1>Delete Combat Instance Data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete the{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        combat instance?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the combat instance data and any relations it has
                        to other data.
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
                <form onSubmit={deleteCombatInstance} id="deletion-modal-form">
                    <input
                        type="text"
                        onChange={({ target }) => {
                            setDeletionString(target.value);
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

export default DeleteCombatInstance;
