import "./CreateModalForm.css";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../imports/imports";

const CreateQuestForm = (props) => {
    // Destructure props
    const { setRenderQuestCreationForm, serosLocations } = props;

    // Create state values
    const [questName, setQuestName] = useState("");
    const [questDescription, setQuestDescription] = useState("");
    const [questCompleted, setQuestCompleted] = useState(false);
    const [locationList, setLocationList] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    // Populate locationList with locations
    useEffect(() => {
        if (locationList.length !== serosLocations.length) {
            setLocationList([
                ...locationList,
                ...serosLocations.map((location) => ({
                    value: location._id,
                    label: location.name,
                })),
            ]);
        }
    }, [serosLocations, locationList]);

    // Create post request
    const postData = (e) => {
        e.preventDefault();
        const questData = {
            quest_name: questName,
            quest_desc: questDescription,
            quest_completed: questCompleted,
            quest_associated_locations: selectedLocations,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(questData),
            mode: "cors",
            credentials: "include",
        };

        fetch("create_quest", init);
    };

    // Function to handle changes in the selection box
    const handleChange = (value) => {
        setSelectedLocations(value.map((location) => location.value));
    };

    // Selection box function
    const Selection = () => (
        <Select
            options={locationList}
            isMulti={true}
            onChange={handleChange}
            styles={customStyles}
            id="quest-location"
        />
    );

    return (
        <>
            <div id="creation-form-map-blur-div"></div>
            <div id="creation-form-container">
                <h2>Create a Quest!</h2>
                <form
                    onSubmit={postData}
                    className="creation-form"
                    id="create-quest-form"
                >
                    <div className="creation-input-div" id="create-quest-name">
                        <label htmlFor="quest-name">
                            Name:
                            <input
                                id="quest-name"
                                type="string"
                                required
                                onChange={({ target }) => {
                                    setQuestName(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div className="creation-input-div" id="create-quest-desc">
                        <label htmlFor="quest-desc">
                            Description:
                            <textarea
                                id="quest-desc"
                                type="text"
                                required
                                onChange={({ target }) => {
                                    setQuestDescription(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-quest-completed"
                    >
                        <label htmlFor="quest-completed">
                            Completed:
                            <input
                                id="quest-completed"
                                type="checkbox"
                                onChange={() =>
                                    setQuestCompleted(!questCompleted)
                                }
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-quest-location"
                    >
                        <label htmlFor="quest-location">
                            Associated Locations:
                            {Selection()}
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-submit"
                    >
                        <button>Submit quest!</button>
                    </div>
                </form>
                <button onClick={() => setRenderQuestCreationForm(false)}>
                    Cancel creation
                </button>
            </div>
        </>
    );
};

export default CreateQuestForm;
