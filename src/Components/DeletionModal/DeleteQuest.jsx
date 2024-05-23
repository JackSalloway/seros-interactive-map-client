import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteQuest = (props) => {
    const {
        deleteData,
        setDeleteData,
        quests,
        setQuests,
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

    const deleteQuest = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            quest_name: deleteData.name,
            quest_id: deleteData.id,
            username: username,
            campaign_id: deleteData.campaign.id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_quest`,
            init
        );
        const returnedData = await result.json(); // returnedData is the list of NPCs, need to do this as deleting quests could affect npcs.

        // Remove quest from quest list
        const questsCopy = [...quests];
        const questToRemove = quests
            .map((quest) => quest.id)
            .indexOf(deleteData.id);
        questsCopy.splice(questToRemove, 1);
        setQuests(questsCopy);

        // Update npcs
        setNPCs(returnedData.npcResult);

        // Add a new notification showing a quest has been deleted
        const newNotification = {
            message: `Quest: ${deleteData.name}, successfully deleted.`,
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
                <h1>Delete Quest data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete the{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        quest?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the quest data and any relations it has to other
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
                <form onSubmit={deleteQuest} id="deletion-modal-form">
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

export default DeleteQuest;
