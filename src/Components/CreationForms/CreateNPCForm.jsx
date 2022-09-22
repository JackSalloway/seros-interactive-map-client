import "./CreateModalForm.css";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../imports/imports";

const CreateNPCForm = (props) => {
    // Destructure props
    const { setRenderNPCCreationForm, serosLocations, serosQuests } = props;

    // Create state values
    const [npcName, setNPCName] = useState("");
    const [npcDescription, setNPCDescription] = useState("");
    const [npcDisposition, setNPCDisposition] = useState("");
    const [npcLocations, setNPCLocations] = useState([]);
    const [npcQuests, setNPCQuests] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [questList, setQuestList] = useState([]);

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

    // Populate questList with quests
    useEffect(() => {
        if (questList.length !== serosQuests.length) {
            setQuestList([
                ...questList,
                ...serosQuests.map((quest) => ({
                    value: quest._id,
                    label: quest.name,
                })),
            ]);
        }
    }, [serosQuests, questList]);

    // Create post request
    const postData = (e) => {
        e.preventDefault();

        const NPCData = {
            npc_name: npcName,
            npc_desc: npcDescription,
            npc_disposition: npcDisposition,
            npc_associated_locations: npcLocations,
            npc_quests: npcQuests,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(NPCData),
            mode: "cors",
            credentials: "include",
        };
        fetch("create_npc", init).then(setRenderNPCCreationForm(false));
    };

    // Function to handle changes in the location selection box
    const handleChangeLocation = (value) => {
        setNPCLocations(value.map((location) => location.value));
    };

    // Function to to handle changes in the quest selection box
    const handleChangeQuest = (value) => {
        setNPCQuests(value.map((quest) => quest.value));
    };

    // Location selection box function
    const SelectionLocations = () => (
        <Select
            options={locationList}
            isMulti={true}
            onChange={handleChangeLocation}
            styles={customStyles}
        />
    );

    // Quest selection box function
    const SelectionQuests = () => (
        <Select
            options={questList}
            isMulti={true}
            onChange={handleChangeQuest}
            styles={customStyles}
        />
    );

    return (
        <>
            <div id="creation-form-map-blur-div"></div>
            <div id="creation-form-container">
                <h2>Create an NPC!</h2>
                <form
                    onSubmit={postData}
                    className="creation-form"
                    id="create-npc-form"
                >
                    <div className="creation-input-div" id="create-npc-name">
                        <label htmlFor="-name">
                            Name:
                            <input
                                id="-name"
                                type="string"
                                required
                                onChange={({ target }) => {
                                    setNPCName(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div className="creation-input-div" id="create-npc-desc">
                        <label htmlFor="-desc">
                            Description:
                            <textarea
                                id="-desc"
                                type="text"
                                required
                                onChange={({ target }) => {
                                    setNPCDescription(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-npc-disposition"
                    >
                        <label htmlFor="npc-disposition">
                            Disposition:
                            <select
                                id="npc-disposition"
                                defaultValue={"default"}
                                required
                                onChange={({ target }) => {
                                    setNPCDisposition(target.value);
                                }}
                            >
                                <option value="default" disabled>
                                    Select a disposition!
                                </option>
                                <option value="Friendly">Friendly</option>
                                <option value="Hostile">Hostile</option>
                            </select>
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-npc-location"
                    >
                        <label htmlFor="-location">
                            Associated Locations:
                            {SelectionLocations()}
                        </label>
                    </div>
                    <div className="creation-input-div" id="create-npc-quest">
                        <label htmlFor="-quest">
                            Associated Quests:
                            {SelectionQuests()}
                        </label>
                    </div>
                    <div className="creation-input-div" id="create-npc-submit">
                        <button>Submit NPC!</button>
                    </div>
                </form>
                <button onClick={() => setRenderNPCCreationForm(false)}>
                    Cancel creation
                </button>
            </div>
        </>
    );
};

export default CreateNPCForm;
