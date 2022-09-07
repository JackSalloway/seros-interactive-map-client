import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const DeleteSubLocation = (props) => {
    const {
        data,
        setDeleteData,
        selectedLocationNotes,
        serosLocations,
        setSerosLocations,
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
            location_id: selectedLocationNotes._id,
            sub_location_name: data.name,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(dataToDelete),
            mode: "cors",
            credentials: "include",
        };

        //   console.log(myInit);

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/delete_sub_location`,
            init
        );
        const returnedData = await result.json();
        let serosLocationsCopy = [...serosLocations];
        const indexToUpdate = serosLocationsCopy
            .map((location) => location._id)
            .indexOf(returnedData._id);
        const location = { ...serosLocationsCopy[indexToUpdate] };
        location.sub_locations = [...returnedData.sub_locations];
        serosLocationsCopy[indexToUpdate] = location;
        setSerosLocations(serosLocationsCopy);
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
                            {he.decode(data.name)}
                        </span>{" "}
                        sub location?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the sub location data and any relations is has to
                        other data.
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

export default DeleteSubLocation;
