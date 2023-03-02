import React, { useState } from "react";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

const CreateNPC = (props) => {
    const {
        locationNotes,
        locationList,
        questList,
        serosNPCs,
        setSerosNPCs,
        setAddNewNPC,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
    } = props;

    // Set states
    const [newNPCName, setNewNPCName] = useState("");
    const [newNPCRace, setNewNPCRace] = useState("");
    const [newNPCDesc, setNewNPCDesc] = useState("");
    const [newNPCDisposition, setNewNPCDisposition] = useState(null);
    const [newNPCStatus, setNewNPCStatus] = useState(null);
    const [newNPCSelectedLocations, setNewNPCSelectedLocations] = useState([
        {
            value: he.decode(locationNotes._id),
            label: he.decode(locationNotes.name),
        },
    ]);
    const [newNPCQuests, setNewNPCQuests] = useState([]);

    // Send POST request to create a new NPC at this location
    const postNPCData = async (e) => {
        e.preventDefault();

        const NPCData = {
            npc_name: newNPCName,
            npc_race: newNPCRace,
            npc_desc: newNPCDesc,
            npc_disposition: newNPCDisposition,
            npc_status: newNPCStatus,
            npc_associated_locations: newNPCSelectedLocations.map(
                (location) => location.value
            ),
            npc_quests: newNPCQuests,
            npc_campaign: campaign.campaign.id,
            username: username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(NPCData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_npc`,
            init
        );
        const returnedData = await result.json();
        setSerosNPCs([...serosNPCs, ...returnedData.npcResult]);
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `NPC: ${newNPCName}, successfully created!`,
            important: false,
        });
        setDataNotifications(notificationsCopy);
        setAddNewNPC(false);

        // Update changelog
        setChangelogData(returnedData.changelogResult.changes);
    };

    // Function to handle changes inside the npc race selection box
    const handleNPCRaceChange = (race) => {
        setNewNPCRace(race.value);
    };

    const raceOptions = [
        { value: "Beholder", label: "Beholder" },
        { value: "Dragon", label: "Dragon" },
        { value: "Dragonborn", label: "Dragonborn" },
        { value: "Dwarf", label: "Dwarf" },
        { value: "Elf", label: "Elf" },
        { value: "Firbolg", label: "Firbolg" },
        { value: "Genasi", label: "Genasi" },
        { value: "Giant", label: "Giant" },
        { value: "Gnome", label: "Gnome" },
        { value: "Half-Elf", label: "Half-Elf" },
        { value: "Halfling", label: "Halfing" },
        { value: "Half-Orc", label: "Half-Orc" },
        { value: "Human", label: "Human" },
        { value: "Kobold", label: "Kolbold" },
        { value: "Mindflayer", label: "Mindflayer" },
        { value: "Orc", label: "Orc" },
        { value: "Tabaxi", label: "Tabaxi" },
        { value: "Tiefling", label: "Tiefling" },
        { value: "Tortle", label: "Tortle" },
        { value: "Unknown", label: "Unknown" },
        { value: "Other", label: "Other" },
    ];

    const npcRaceSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={raceOptions}
            isMulti={false}
            onChange={handleNPCRaceChange}
            styles={customStyles}
            id="npc-race"
        />
    );

    // Function to handle changes inside the npc associated quests selection box
    const handleNPCQuestChange = (value) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        setNewNPCQuests(value.map((location) => location.value));
    };

    // Create a react select component for npc associated quests
    const npcQuestSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={questList}
            defaultValue={newNPCQuests}
            isMulti={true}
            onChange={handleNPCQuestChange}
            styles={customStyles}
            id="npc-quests"
        />
    );

    // Function to handle changes inside the npc associated locations box
    const handleNPCLocationChange = (value) => {
        // Having issues keeping the location that is already selected in the selection box (not allowing it to be removed)
        setNewNPCSelectedLocations(
            value.map((location) => {
                return {
                    value: he.decode(location.value),
                    label: he.decode(location.label),
                };
            })
        );
    };

    // Create a react select component for npc associated locations
    const npcLocationSelection = () => (
        <Select
            menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
            menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
            menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
            options={locationList}
            defaultValue={newNPCSelectedLocations}
            isMulti={true}
            onChange={handleNPCLocationChange}
            styles={customStyles}
            id="npc-locations"
        />
    );

    // Render NPC form
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
                    onSubmit={postNPCData}
                    className="location-notes-form quest-form"
                >
                    <div className="create-npc-name location-notes-create first-input">
                        <label htmlFor="npc-name">
                            NPC Name:
                            <input
                                id="npc-name"
                                type="string"
                                required
                                onChange={({ target }) => {
                                    setNewNPCName(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="create-npc-race location-notes-create">
                        <label htmlFor="npc-race">
                            NPC Race:
                            {npcRaceSelection()}
                        </label>
                    </div>

                    <div className="create-location-npc-desc location-notes-create">
                        <label htmlFor="npc-desc">
                            NPC Description:
                            <textarea
                                id="npc-desc"
                                type="text"
                                required
                                onChange={({ target }) => {
                                    setNewNPCDesc(target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="create-location-disposition-status location-notes-create">
                        <label htmlFor="disposition-status">
                            NPC Disposition:
                            <select
                                name="disposition-status"
                                defaultValue="default"
                                id="npc-disposition"
                                onChange={({ target }) => {
                                    setNewNPCDisposition(target.value);
                                }}
                            >
                                <option value="default" disabled>
                                    Select a disposition!
                                </option>
                                <option value="Friendly">Friendly</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Hostile">Hostile</option>
                            </select>
                        </label>
                    </div>

                    <div className="create-npc-status-status location-notes-create">
                        <label htmlFor="disposition-status">
                            NPC status:
                            <select
                                name="disposition-status"
                                defaultValue="default"
                                id="npc-status"
                                onChange={({ target }) => {
                                    setNewNPCStatus(target.value);
                                }}
                            >
                                <option value="default" disabled>
                                    Select a status!
                                </option>
                                <option value="Alive">Alive</option>
                                <option value="Deceased">Deceased</option>
                            </select>
                        </label>
                    </div>

                    <div className="create-npc-associated-locations location-notes-create">
                        <label htmlFor="npc-associated-locations">
                            NPC Associated Locations:
                            {npcLocationSelection()}
                        </label>
                    </div>

                    <div className="create-npc-associated-quests location-notes-create">
                        <label htmlFor="npc-quests">
                            NPC Associated Quests:
                            {npcQuestSelection()}
                        </label>
                    </div>

                    <div className="location-notes-submit">
                        <button>Submit NPC!</button>
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

export default CreateNPC;
