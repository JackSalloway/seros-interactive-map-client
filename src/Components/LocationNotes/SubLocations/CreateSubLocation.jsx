import React, { useState } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../../imports/imports";

const CreateSubLocation = (props) => {
    const {
        locationNotes,
        serosLocations,
        setSerosLocations,
        setAddNewSubLocation,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
    } = props;

    // Set states
    const [newSubLocationName, setNewSubLocationName] = useState("");
    const [newSubLocationDesc, setNewSubLocationDesc] = useState("");

    // Send POST request to create new sub location at this location
    const postSubLocationData = async (e) => {
        e.preventDefault();

        const subLocationData = {
            sub_location_name: newSubLocationName,
            sub_location_desc: newSubLocationDesc,
            parent_location_id: locationNotes._id,
            location_campaign_id: campaign.id,
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
            `${process.env.REACT_APP_API_URL}/create_sub_location`,
            init
        );
        const data = await result.json();
        console.log(data);
        let serosLocationsCopy = [...serosLocations];
        const indexToUpdate = serosLocationsCopy
            .map((location) => location._id)
            .indexOf(data.subLocationResult._id);
        const location = { ...serosLocationsCopy[indexToUpdate] };
        location.sub_locations = [...data.subLocationResult.sub_locations];
        serosLocationsCopy[indexToUpdate] = location;
        setSerosLocations(serosLocationsCopy);
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `Sub-location: ${newSubLocationName}, successfully created!`,
            important: false,
        });
        setDataNotifications(notificationsCopy);
        setAddNewSubLocation(false);

        // Update changelog
        setChangelogData(data.changelogResult.changes);
    };

    // Render sub location form
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
                        <button>Submit Sub Location!</button>
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
};

export default CreateSubLocation;
