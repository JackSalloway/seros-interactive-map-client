import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteLocation = (props) => {
    const {
        data,
        setDeleteData,
        serosLocations,
        setSerosLocations,
        setSerosNPCs, // This would be for removing associated locations from NPCs after deleting a location
        setSerosQuests, // This would be for removing assocaited locations from Quests after deleting a location
        dataNotifications,
        setDataNotifications,
        username,
        changelogData,
        setChangelogData,
    } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    const deleteLocationString = "DELETE-LOCATION: "; // Wanted to do this as deleting a location is quite a serious thing.

    useEffect(() => {
        if (deletionString === deleteLocationString + he.decode(data.name)) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [data.name, deletionString]);

    const deleteData = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            location_id: data._id,
            location_campaign_id: data.campaign,
            location_name: data.name,
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
        let serosLocationsCopy = [...serosLocations];
        const indexToRemove = serosLocationsCopy
            .map((location) => location._id)
            .indexOf(data._id);
        // const location = { ...serosLocationsCopy[indexToUpdate] };
        // location.sub_locations = [...returnedData.sub_locations];
        // serosLocationsCopy[indexToUpdate] = location;
        // setSerosNPCs(result.newNPCs);
        // setSerosQuests(result.newQuests);
        serosLocationsCopy.splice(indexToRemove, 1);

        setSerosLocations(serosLocationsCopy);
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `Location: ${data.name}, successfully deleted.`,
            important: false,
        });
        setDataNotifications(notificationsCopy);
        setDeleteData(null);

        console.log(returnedData);

        // Update changelogData
        setChangelogData(returnedData.changelogResult.changes);
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
                            {he.decode(data.name)}
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
                            {deleteLocationString + he.decode(data.name)}
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

export default DeleteLocation;
