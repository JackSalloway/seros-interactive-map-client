import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    splitParas,
} from "../../../imports/imports";
import Separator from "../Separator/Separator";

const SublocationNotes = (props) => {
    const {
        sublocation,
        index,
        locationNotes,
        setDeleteData,
        locations,
        setLocations,
        dataNotifications,
        setDataNotifications,
        campaign,
        changelog,
        setChangelog,
        username,
    } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    // Update value states
    const [editing, setEditing] = useState(false);
    const [updatedSublocationName, setUpdatedSublocationName] = useState(
        sublocation.name
    );
    const [updatedSublocationDescription, setUpdatedSublocationDescription] =
        useState(sublocation.description);

    useEffect(() => {
        // Reset update inputs on update form close
        if (editing === false) {
            setUpdatedSublocationName(he.decode(sublocation.name));
            setUpdatedSublocationDescription(
                he.decode(sublocation.description)
            );
        }
    }, [editing, sublocation]);

    // Expand chevron has not been clicked so render sub-location banner
    if (selected === false) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(/images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details-header details-closed location-notes-brighter-filter"
                    style={{ backgroundImage: `url(/images/papyr.jpg)` }}
                >
                    <h4>{he.decode(sublocation.name)}</h4>
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
                        backgroundImage: `url(/images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    const updateSubLocationData = async (e) => {
        e.preventDefault();

        const data = {
            sublocation_id: sublocation.id,
            sublocation_name: updatedSublocationName,
            sublocation_description: updatedSublocationDescription,
            username: username,
            campaign_id: campaign.id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(data),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_sub_location`,
            init
        );
        const returnedData = await result.json();

        // Update the relevant location with the new sublocation and set the locations array
        // Find and update the correct sublocation
        let locationCopy = locationNotes;
        locationCopy.sublocations[index] = returnedData.sublocationResult;

        // Find and update the correct location
        let locationsCopy = [...locations];
        const locationIndexToUpdate = locationsCopy
            .map((location) => location.id)
            .indexOf(locationNotes.id);
        locationsCopy[locationIndexToUpdate].sublocations =
            locationCopy.sublocations;
        setLocations(locationsCopy);

        // Add a new notification showing that a sublocation has been updated
        const newNotification = {
            message: `Sub-location: ${updatedSublocationName}, successfully updated!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog
        setChangelog([...changelog, returnedData.changelogResult]);

        // Clean up state values that caused the edit form to render
        setEditing(false);
    };

    // Edit icon has been clicked so render sub-location edit form
    // Return a form with values set to sub location values for the user to update
    if (editing === true) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{
                        backgroundImage: `url(/images/statblockbar.jpg)`,
                    }}
                />
                <div
                    className="location-notes-details location-notes-brighter-filter"
                    style={{ backgroundImage: `url(/images/papyr.jpg)` }}
                >
                    <div className="location-notes-details-data-section name-section editing">
                        <h4>Update: {he.decode(sublocation.name)}</h4>
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
                                    value={updatedSublocationName}
                                    type="string"
                                    required
                                    placeholder="Sub-location name"
                                    onChange={({ target }) => {
                                        setUpdatedSublocationName(target.value);
                                    }}
                                />
                            </label>
                        </div>

                        <div className="create-location-sub-location-desc location-notes-create">
                            <label htmlFor="sub-location-desc">
                                Sub Location Description:
                                <textarea
                                    id="sub-location-desc"
                                    value={updatedSublocationDescription}
                                    type="text"
                                    required
                                    placeholder="Sub-location description"
                                    onChange={({ target }) => {
                                        setUpdatedSublocationDescription(
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
                        backgroundImage: `url(/images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    // Sub-location expand chevron has been clicked, render sub-location details
    return (
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
            <div
                className="location-notes-details location-notes-brighter-filter location-notes-open-internal"
                key={sublocation.name}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundImage: `url(/images/papyr.jpg)` }}
            >
                <div className="details-open">
                    <div className="location-notes-open-header-wrapper">
                        <h4>{he.decode(sublocation.name)}</h4>
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
                                    onClick={() => setDeleteData(sublocation)}
                                >
                                    <FontAwesomeIcon
                                        icon="trash-can"
                                        className="journal-fa-icon"
                                    />
                                </span>
                            </div>
                        ) : (
                            <div className="notes-button-wrapper unhovered">
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
                                    onClick={() => setDeleteData(sublocation)}
                                >
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
                            {splitParas(sublocation.description).map(
                                (para, index) => (
                                    <p
                                        key={index}
                                        className="location-notes-description-paragraph"
                                    >
                                        {he.decode(para)}
                                    </p>
                                )
                            )}
                        </div>

                        <Separator />
                    </div>
                </div>
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
        </div>
    );
};

export default SublocationNotes;
