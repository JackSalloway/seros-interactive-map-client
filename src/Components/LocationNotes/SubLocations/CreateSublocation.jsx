import React, { useState } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../../imports/imports";

const CreateSublocation = (props) => {
    const {
        locationNotes,
        locations,
        setLocations,
        setAddNewSubLocation,
        dataNotifications,
        setDataNotifications,
        campaign,
        changelog,
        setChangelog,
        username,
    } = props;

    // Set states
    const [newSubLocationName, setNewSubLocationName] = useState("");
    const [newSubLocationDesc, setNewSubLocationDesc] = useState("");

    // Send POST request to create new sub location at this location
    const postSubLocationData = async (e) => {
        e.preventDefault();

        const subLocationData = {
            sublocation_name: newSubLocationName,
            sublocation_description: newSubLocationDesc,
            parent_location_id: locationNotes.id,
            campaign_id: campaign.id,
            username: username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(subLocationData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_sublocation`,
            init
        );
        const data = await result.json();

        // Update locations array by adding the new sublocation to the relevant location
        let locationsCopy = [...locations];
        const indexToUpdate = locationsCopy
            .map((location) => location.id)
            .indexOf(data.sublocationResult.location_id);
        const location = { ...locationsCopy[indexToUpdate] };
        location.sublocations = [
            ...location.sublocations,
            data.sublocationResult,
        ];
        locationsCopy[indexToUpdate] = location;
        setLocations(locationsCopy);

        // Add a notification to the notifications array
        const newNotification = {
            message: `Sub-location: ${newSubLocationName}, successfully created!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);
        setAddNewSubLocation(false);

        // Update changelog showing the newly created sublocation
        setChangelog([...changelog, ...data.changelogResult]);
    };

    // Render sub location form
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
                <form
                    onSubmit={postSubLocationData}
                    className="location-notes-form sub-location-form"
                >
                    <div className="create-location-sub-location-name location-notes-create first-input">
                        <label htmlFor="sub-location-name">
                            Sub Location Name:
                            <input
                                id="sub-location-name"
                                type="string"
                                placeholder="Sub-location name"
                                required
                                onChange={({ target }) => {
                                    setNewSubLocationName(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="create-location-sub-location-desc location-notes-create">
                        <label htmlFor="sub-location-desc">
                            Sub Location Description:
                            <textarea
                                id="sub-location-desc"
                                type="text"
                                placeholder="Sub-location description"
                                required
                                onChange={({ target }) => {
                                    setNewSubLocationDesc(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="location-notes-submit">
                        <button>Submit Sublocation!</button>
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
};

export default CreateSublocation;
