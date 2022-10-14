import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteQuest = (props) => {
    const {
        data,
        setDeleteData,
        serosQuests,
        setSerosQuests,
        setSerosNPCs,
        setDataResponseMessage,
    } = props;

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
        const serosQuestsCopy = [...serosQuests];
        const questToRemove = serosQuests
            .map((quest) => quest._id)
            .indexOf(data._id);
        serosQuestsCopy.splice(questToRemove, 1);
        setSerosQuests(serosQuestsCopy);
        setSerosNPCs(returnedData);
        setDataResponseMessage({
            message: `Quest: ${data.name}, successfully deleted.`,
            important: false,
        });
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
                            {he.decode(data.name)}
                        </span>{" "}
                        quest?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the quest data and any relations it has to other
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
