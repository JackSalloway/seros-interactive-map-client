import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteLocation = (props) => {
    const {
        deleteData,
        setDeleteData,
        locations,
        setLocations,
        setNPCs, // This would be for removing associated locations from NPCs after deleting a location
        setQuests, // This would be for removing assocaited locations from Quests after deleting a location
        setCombatInstances,
        dataNotifications,
        setDataNotifications,
        username,
        changelog,
        setChangelog,
    } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    const deleteLocationString = "DELETE-LOCATION: "; // Wanted to do this as deleting a location is quite a serious thing.

    useEffect(() => {
        if (
            deletionString ===
            deleteLocationString + he.decode(deleteData.name)
        ) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [deleteData, deletionString]);

    const deleteLocation = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            location_id: deleteData.id,
            campaign_id: deleteData.campaign.id,
            location_name: deleteData.name,
            username: username,
        };

        const init = {
            method: "DELETE",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_location`,
            init
        );
        const returnedData = await result.json();

        // Remove relevant location from location list
        let locationsCopy = [...locations];
        const indexToRemove = locationsCopy
            .map((location) => location.id)
            .indexOf(deleteData.id);
        locationsCopy.splice(indexToRemove, 1);
        setLocations(locationsCopy);

        // Update npc list
        setNPCs(returnedData.npcResult);

        // Update quest list
        setQuests(returnedData.questResult);

        // Update combat instance list
        setCombatInstances(returnedData.combatInstanceResult);

        // Add a new notification showing that a location has been successfully deleted
        const newNotification = {
            message: `Location: ${deleteData.name}, successfully deleted.`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelogData
        setChangelog([...changelog, ...returnedData.changelogResult]);

        // Update state to cause deletion modal to de-render
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
                <h1>Delete Location data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete the{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        location?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the location data and any relations it has to
                        other data.
                    </p>
                    <div className="deletion-modal-warning">
                        <h3>WARNING</h3>
                        <p>
                            As this is a location, this could potentially alter
                            a lot of data:
                        </p>
                        <ul>
                            <li>
                                Any{" "}
                                <span className="deletion-modal-warning-bold">
                                    quests
                                </span>{" "}
                                that are associated to this location will lose
                                it in their associated locations list. This
                                could result in quests having zero associated
                                locaitons.
                            </li>
                            <li>
                                Any{" "}
                                <span className="deletion-modal-warning-bold">
                                    npcs
                                </span>{" "}
                                that are associated to this location will lose
                                it in their associated locations list. This
                                could result in npcs having zero associated
                                locaitons.
                            </li>
                            <li>
                                All{" "}
                                <span className="deletion-modal-warning-bold">
                                    sub locations
                                </span>{" "}
                                found within this location will be deleted.
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="deletion-modal-p">
                    <p>
                        Please type{" "}
                        <span className="data-to-delete">
                            {deleteLocationString + he.decode(deleteData.name)}
                        </span>{" "}
                        to confirm.
                    </p>
                </div>
                <form onSubmit={deleteLocation} id="deletion-modal-form">
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

export default DeleteLocation;
