import { useState, useEffect } from "react";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

const CreateCombatInstance = (props) => {
    // required inputs fields
    // name: STRING
    // description: STRING
    // combat_details: [
    //     {
    //         player_name: STRING,
    //         player_class: STRING,
    //         turns: {
    //             damage: [NUM],
    //             healing: [NUM],
    //         }
    //     }
    // ]

    // campaignId & locationId will be obtained from state values passed into this component

    const {
        locationNotes,
        campaign,
        setChangelogData,
        username,
        combatInstanceData,
        setCombatInstanceData,
    } = props;

    // Instance data states
    const [turns, setTurns] = useState(1);

    // React Select box states
    const [playerList, setPlayerList] = useState(
        campaign.campaign.players.map((player) => {
            return {
                value: {
                    name: player.name,
                    class: player.class,
                    // _id: player._id,
                },
                label: player.name,
            };
        })
    );

    // New Character values states
    const [newCharacterName, setNewCharacterName] = useState("");
    const [newCharacterClass, setNewCharacterClass] = useState("");
    const [newCharacterIsPlayerCharacter, setNewCharacterIsPlayerCharacter] =
        useState(null);
    const [newCharacterInvalidInputs, setNewCharacterInvalidInputs] =
        useState(true); // Used to disable to add new character button if inputs are not valid

    // POST data states
    const [InstanceName, setInstanceName] = useState("");
    const [InstanceDescritption, setInstanceDescription] = useState("");
    const [instanceDetails, setInstanceDetails] = useState({});

    // Update newCharacterInvalidInputs state value when the inputs are considered valid
    useEffect(() => {
        if (
            newCharacterName === "" ||
            newCharacterClass === "" ||
            newCharacterIsPlayerCharacter === null
        ) {
            setNewCharacterInvalidInputs(true);
            return;
        } else setNewCharacterInvalidInputs(false);
    }, [newCharacterName, newCharacterClass, newCharacterIsPlayerCharacter]);

    // Send POST request to create a new Combat Instance at this location
    const postInstanceData = async (e) => {
        e.preventDefault();

        const instanceData = {
            instance_name: InstanceName,
            instance_desc: InstanceDescritption,
            instance_details: instanceDetails,
            instance_location_id: locationNotes._id,
            instance_campaign_id: campaign.campaign._id,
            username: username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(instanceData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_combat_instance`,
            init
        );
        // await returned data here
    };

    // Function to handle changes inside the player selection box
    const handleSelectedPlayersChange = (selectedPlayerList) => {
        console.log(selectedPlayerList);
        return;
    };

    const playerSelection = () => {
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={playerList}
                isMulti={true}
                onChange={handleSelectedPlayersChange}
                styles={customStyles}
            />
        );
    };

    const addNewCharacterValues = () => {
        setPlayerList([
            ...playerList,
            {
                value: { name: newCharacterName, class: newCharacterClass },
                label: newCharacterName,
                player_character: newCharacterIsPlayerCharacter,
            },
        ]);
    };

    // New character class selection options
    const handleNewCharacterClassChange = (characterClass) => {
        setNewCharacterClass(characterClass.value);
    };

    const fifthEditionClasses = [
        { value: "Artificer", label: "Artificer" },
        { value: "Barbarian", label: "Barbarian" },
        { value: "Bard", label: "Bard" },
        { value: "Blood Hunter", label: "Blood Hunter" },
        { value: "Cleric", label: "Cleric" },
        { value: "Druid", label: "Druid" },
        { value: "Fighter", label: "Fighter" },
        { value: "Monk", label: "Monk" },
        { value: "Paladin", label: "Paladin" },
        { value: "Ranger", label: "Ranger" },
        { value: "Rogue", label: "Rogue" },
        { value: "Sorcerer", label: "Sorcerer" },
        { value: "Warlock", label: "Warlock" },
        { value: "Wizard", label: "Wizard" },
        { value: "unknown", label: "unknown" },
    ];

    const newCharacterClassSelection = () => {
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={fifthEditionClasses}
                isMulti={false}
                onChange={handleNewCharacterClassChange}
                styles={customStyles}
                placeholder="Select a class..."
            />
        );
    };

    // Remember new character selection options - wether or not the character should be added to the list of players in the campaign
    const handleNewCharacterTypeChange = (input) => {
        setNewCharacterIsPlayerCharacter(input.value);
    };

    const newCharacterTypeSelection = () => {
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={[
                    {
                        value: true,
                        label: "Player Character (remember for next time)",
                    },
                    {
                        value: false,
                        label: "Non-player Character (do not remember for next time)",
                    },
                ]}
                isMulti={false}
                onChange={handleNewCharacterTypeChange}
                styles={customStyles}
                placeholder="Select a class..."
            />
        );
    };

    return (
        <>
            <div className="location-notes-create">
                <label htmlFor="instance-players">
                    Select players:
                    {playerSelection()}
                </label>
            </div>
            <div className="location-notes-create add-new-character-inputs">
                <h3>Add a new character:</h3>
                <label htmlFor="new-character-name">
                    New character name:
                    <input
                        id="new-character-name"
                        type="string"
                        onChange={({ target }) => {
                            setNewCharacterName(target.value);
                        }}
                    />
                </label>
                <label htmlFor="new-character-class">
                    New character class:{newCharacterClassSelection()}
                </label>
                <label htmlFor="new-character-remember">
                    Player character or NPC:{newCharacterTypeSelection()}
                </label>
                <button
                    disabled={newCharacterInvalidInputs}
                    onClick={() => addNewCharacterValues()}
                >
                    {newCharacterInvalidInputs === true
                        ? "Missing new character values"
                        : "Add character!"}
                </button>
            </div>
        </>
    );
};

export default CreateCombatInstance;
