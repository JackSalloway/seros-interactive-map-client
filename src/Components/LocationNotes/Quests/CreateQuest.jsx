import React, { useState } from "react";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

const CreateQuest = (props) => {
    const {
        locationNotes,
        locationList,
        serosQuests,
        setSerosQuests,
        setAddNewQuest,
        dataNotifications,
        setDataNotifications,
        campaign,
    } = props;

    // Set states
    const [newQuestName, setNewQuestName] = useState("");
    const [newQuestDesc, setNewQuestDesc] = useState("");
    const [newQuestStatus, setNewQuestStatus] = useState(null);
    const [newQuestSelectedLocations, setNewQuestSelectedLocations] = useState([
        {
            value: he.decode(locationNotes._id),
            label: he.decode(locationNotes.name),
        },
    ]);

    // Send POST request to create a new quest at this location
    const postQuestData = async (e) => {
        e.preventDefault();

        const questData = {
            quest_name: newQuestName,
            quest_desc: newQuestDesc,
            quest_completed: newQuestStatus,
            quest_associated_locations: newQuestSelectedLocations.map(
                (location) => location.value
            ),
            quest_campaign: campaign.id,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(questData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_quest`,
            init
        );
        const returnedData = await result.json();
        setSerosQuests([...serosQuests, ...returnedData]);
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `Quest: ${newQuestName}, successfully created!`,
            important: false,
        });
        setDataNotifications(notificationsCopy);
        setAddNewQuest(false);
    };

    // Function to handle changes in the selection box
    const handleQuestLocationChange = (locations) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        setNewQuestSelectedLocations(
            locations.map((location) => {
                return {
                    value: he.decode(location.value),
                    label: he.decode(location.label),
                };
            })
        );
    };

    // Create react select component for quest associated locations
    const questLocationSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={locationList}
            defaultValue={newQuestSelectedLocations}
            isMulti={true}
            onChange={handleQuestLocationChange}
            styles={customStyles}
            id="quest-location"
        />
    );

    // Render quest form
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
                    onSubmit={postQuestData}
                    className="location-notes-form quest-form"
                >
                    <div className="create-location-quest-name location-notes-create first-input">
                        <label htmlFor="quest-name">
                            Quest Name:
                            <input
                                id="quest-name"
                                type="string"
                                required
                                onChange={({ target }) => {
                                    setNewQuestName(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="create-location-quest-desc location-notes-create">
                        <label htmlFor="quest-desc">
                            Quest Description:
                            <textarea
                                id="quest-desc"
                                type="text"
                                required
                                onChange={({ target }) => {
                                    setNewQuestDesc(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="create-location-quest-status location-notes-create">
                        <label htmlFor="quest-status">
                            Quest Status:
                            <select
                                name="quest-status"
                                defaultValue="default"
                                id="quest-status"
                                onChange={({ target }) => {
                                    setNewQuestStatus(target.value);
                                }}
                            >
                                <option value="default" disabled>
                                    Select a status!
                                </option>
                                <option value={false}>Incompleted</option>
                                <option value={true}>Completed</option>
                            </select>
                        </label>
                    </div>

                    <div className="create-location-quest-associated-locations location-notes-create">
                        <label htmlFor="quest-associated-locations">
                            Quest Associated Locations:
                            {questLocationSelection()}
                        </label>
                    </div>

                    <div className="location-notes-submit">
                        <button>Submit Quest!</button>
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

export default CreateQuest;
