import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteSubLocation = (props) => {
    const {
        deleteData,
        setDeleteData,
        selectedLocationNotes,
        locations,
        setLocations,
        dataNotifications,
        setDataNotifications,
        username,
        changelog,
        setChangelog,
    } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    useEffect(() => {
        if (deletionString === he.decode(deleteData.name)) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [deleteData, deletionString]);

    const deleteSublocation = async (e) => {
        e.preventDefault();

        const dataToDelete = {
            sublocation_id: deleteData.id,
            sublocation_name: deleteData.name,
            campaign_id: selectedLocationNotes.campaign.id,
            username: username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_sublocation`,
            init
        );
        const returnedData = await result.json();

        // Find the index of the location that is being modified
        let locationsCopy = [...locations];
        const locationIndexToUpdate = locationsCopy
            .map((location) => location.id)
            .indexOf(selectedLocationNotes.id);

        const location = { ...locationsCopy[locationIndexToUpdate] };

        // Find the index of the sublocation that is being removed
        const sublocationIndexToRemove = locationsCopy
            .map((location) => location.sublocations)
            [locationIndexToUpdate].map((sublocation) => sublocation.id)
            .indexOf(returnedData.sublocation_id);

        // Remove the sublocation from the relevant location
        location.sublocations.splice(sublocationIndexToRemove, 1);
        locationsCopy[locationIndexToUpdate] = location;
        console.log(locationsCopy);
        setLocations(locationsCopy);

        // Add a new notification showing a sublocation has been deleted
        const newNotification = {
            message: `Sub-location: ${deleteData.name}, successfully deleted.`,
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
                <h1>Delete Sub Location data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete the{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        sub location?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the sub location data and any relations it has to
                        other data.
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
                <form onSubmit={deleteSublocation} id="deletion-modal-form">
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

export default DeleteSubLocation;
