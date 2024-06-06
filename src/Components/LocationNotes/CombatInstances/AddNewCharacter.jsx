import { useState, useEffect } from "react";
import Select from "react-select";
import { customStyles } from "../../../imports/imports";

const AddNewCharacter = (props) => {
    const {
        newCharacterName,
        setNewCharacterName,
        newCharacterClass,
        setNewCharacterClass,
        newCharacterIsPlayerCharacter,
        setNewCharacterIsPlayerCharacter,
        addNewCharacterValues,
        setRenderNewCharacterForm,
    } = props;

    const [newCharacterInvalidInputs, setNewCharacterInvalidInputs] =
        useState(true); // Used to disable to add new character button if inputs are not valid

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

    // Reset state values and close form on button click
    const closeForm = () => {
        setNewCharacterName("");
        setNewCharacterClass("");
        setNewCharacterIsPlayerCharacter(null);
        setRenderNewCharacterForm(false);
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
        { value: "Unknown", label: "Unknown" },
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
                        label: "Player character",
                    },
                    {
                        value: false,
                        label: "Non-player character",
                    },
                ]}
                isMulti={false}
                onChange={handleNewCharacterTypeChange}
                styles={customStyles}
                placeholder="Player character or Non-player character"
            />
        );
    };
    return (
        <>
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
                <label>
                    New character class:{newCharacterClassSelection()}
                </label>
                <label>
                    Player character or NPC:{newCharacterTypeSelection()}
                </label>
                <button
                    disabled={newCharacterInvalidInputs}
                    onClick={() => addNewCharacterValues()}
                >
                    {newCharacterInvalidInputs === true
                        ? "Invalid new character values"
                        : "Add character!"}
                </button>
                <button onClick={() => closeForm()}>
                    Cancel character creation
                </button>
            </div>
        </>
    );
};

export default AddNewCharacter;
