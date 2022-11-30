import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    splitParas,
} from "../../../imports/imports";
import Separator from "../Separator/Separator";

const SubLocationNotes = (props) => {
    const {
        subLocation,
        index,
        locationNotes,
        setDeleteData,

        serosLocations,
        setSerosLocations,
        dataNotifications,
        setDataNotifications,
    } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    // Update value states
    const [editing, setEditing] = useState(false);
    const [updatedSubLocationName, setUpdatedSubLocationName] = useState(
        subLocation.name
    );
    const [updatedSubLocationDescription, setUpdatedSubLocationDescription] =
        useState(subLocation.desc);

    useEffect(() => {
        // Reset update inputs on update form close
        if (editing === false) {
            setUpdatedSubLocationName(he.decode(subLocation.name));
            setUpdatedSubLocationDescription(he.decode(subLocation.desc));
        }
    }, [editing, subLocation.name, subLocation.desc]);

    if (selected === false) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details-header details-closed location-notes-brighter-filter"
                    style={{ backgroundImage: `url(./images/papyr.jpg)` }}
                >
                    <h4>{he.decode(subLocation.name)}</h4>
                    <span
                        data-testid="expand sub-location icon"
                        onClick={() => {
                            setSelected(!selected);
                        }}
                    >
                        <FontAwesomeIcon
                            icon="chevron-down"
                            className="journal-fa-icon"
                        />
                    </span>
                </div>
                <div
                    className="location-notes-details-border bottom"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    const updateSubLocationData = async (e) => {
        e.preventDefault();

        const subLocationData = {
            location_id: locationNotes._id,
            location_name: locationNotes.name,
            sub_location_index: index,
            sub_location_name: subLocation.name,
            sub_location_desc: subLocation.desc,
            updated_sub_location_name: updatedSubLocationName,
            updated_sub_location_desc: updatedSubLocationDescription,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(subLocationData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_sub_location`,
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
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `Sub-location: ${updatedSubLocationName}, successfully updated!`,
            important: false,
        });
        setDataNotifications(notificationsCopy);
        setEditing(false);
    };

    // Return a form with values set to sub location values for the user to update
    if (editing === true) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details location-notes-brighter-filter"
                    style={{ backgroundImage: `url(./images/papyr.jpg)` }}
                >
                    <div className="location-notes-details-data-section name-section editing">
                        <h4>{he.decode(subLocation.name)}</h4>
                        <span
                            data-testid="cancel edit sub-location icon"
                            className="journal-fa-icon cancel-edit"
                            onClick={() => {
                                setEditing(false);
                            }}
                        >
                            <FontAwesomeIcon icon="times" />
                        </span>
                    </div>
                    <form
                        onSubmit={updateSubLocationData}
                        className="location-notes-form sub-location-form"
                    >
                        <div className="create-location-sub-location-name location-notes-create">
                            <label htmlFor="sub-location-name">
                                Sub Location Name:
                                <input
                                    id="sub-location-name"
                                    value={updatedSubLocationName}
                                    type="string"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedSubLocationName(target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-location-sub-location-desc location-notes-create">
                            <label htmlFor="sub-location-desc">
                                Sub Location Description:
                                <textarea
                                    id="sub-location-desc"
                                    value={updatedSubLocationDescription}
                                    type="text"
                                    required
                                    onChange={({ target }) => {
                                        setUpdatedSubLocationDescription(
                                            target.value
                                        );
                                    }}
                                />
                            </label>
                        </div>

                        <div className="location-notes-submit">
                            <button>Update Sub Location!</button>
                        </div>
                    </form>
                </div>
                <div
                    className="location-notes-details-border bottom"
                    style={{
                        backgroundImage: `url(./images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    return (
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(./images/statblockbar.jpg)` }}
            />
            <div
                className="location-notes-details location-notes-brighter-filter location-notes-open-internal"
                key={subLocation.name}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundImage: `url(./images/papyr.jpg)` }}
            >
                <div className="details-open">
                    <div className="location-notes-open-header-wrapper">
                        <h4>{he.decode(subLocation.name)}</h4>
                    </div>
                    <div className="location-notes-open-icons-wrapper">
                        <span
                            data-testid="collapse sub-location icon"
                            onClick={() => {
                                setSelected(!selected);
                            }}
                        >
                            <FontAwesomeIcon
                                icon="chevron-up"
                                className="journal-fa-icon"
                            />
                        </span>
                        {hover === true ? (
                            <div className="notes-button-wrapper hovered">
                                <span
                                    data-testid="edit sub-location icon"
                                    onClick={() => setEditing(true)}
                                >
                                    <FontAwesomeIcon
                                        icon="pencil"
                                        className="journal-fa-icon"
                                    />
                                </span>
                                <span
                                    data-testid="delete sub-location icon"
                                    onClick={() => setDeleteData(subLocation)}
                                >
                                    <FontAwesomeIcon
                                        icon="trash-can"
                                        className="journal-fa-icon"
                                    />
                                </span>
                            </div>
                        ) : (
                            <div className="notes-button-wrapper unhovered">
                                <span data-testid="edit sub-location icon">
                                    <FontAwesomeIcon
                                        icon="pencil"
                                        className="journal-fa-icon"
                                    />
                                </span>
                                <span data-testid="delete sub-location icon">
                                    <FontAwesomeIcon
                                        icon="trash-can"
                                        className="journal-fa-icon"
                                    />
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="location-notes-open-details-wrapper ">
                        <Separator />
                        <div className="location-notes-details-data-section">
                            {splitParas(subLocation.desc).map((para) => (
                                <p className="location-notes-description-paragraph">
                                    {he.decode(para)}
                                </p>
                            ))}
                        </div>

                        <Separator />
                    </div>
                </div>
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(./images/statblockbar.jpg)` }}
            />
        </div>
    );
};

export default SubLocationNotes;
