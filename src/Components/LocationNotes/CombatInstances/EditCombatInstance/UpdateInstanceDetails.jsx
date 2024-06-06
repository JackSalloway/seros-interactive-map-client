import { useState } from "react";
import Select from "react-select";
import { customStyles } from "../../../../imports/imports";

import AddNewCharacter from "../AddNewCharacter";

const InstanceDetails = (props) => {
    const {
        instanceName,
        setInstanceName,
        instanceDescription,
        setInstanceDescription,
        turns,
        pcList,
        setPCList,
        selectedPCs,
        handleSelectedPCsChange,
        npcList,
        setNPCList,
        selectedNPCs,
        handleSelectedNPCsChange,
        renderNewCharacterForm,
        setRenderNewCharacterForm,
        dataNotifications,
        setDataNotifications,
    } = props;

    // New Character values states
    const [newCharacterName, setNewCharacterName] = useState("");
    const [newCharacterClass, setNewCharacterClass] = useState("");
    const [newCharacterIsPlayerCharacter, setNewCharacterIsPlayerCharacter] =
        useState(null);

    const pcSelection = () => {
        if (selectedPCs === null) return;
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={pcList}
                isMulti={true}
                onChange={handleSelectedPCsChange}
                styles={customStyles}
                placeholder="Select involved players..."
                defaultValue={selectedPCs}
            />
        );
    };

    const npcSelection = () => {
        if (selectedNPCs === null) return;
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={npcList}
                isMulti={true}
                onChange={handleSelectedNPCsChange}
                styles={customStyles}
                placeholder="Select involved players..."
                defaultValue={selectedNPCs}
            />
        );
    };

    const addNewCharacterValues = () => {
        const character = {
            value: {
                name: newCharacterName,
                class: newCharacterClass,
                isReal: newCharacterIsPlayerCharacter,
                foundational: false,
                turns: Array(turns.length)
                    .fill()
                    .map((_, index) => {
                        return {
                            turn_number: index + 1,
                            damage: 0,
                            healing: 0,
                        };
                    }),
                removedTurns: [],
            },
            label: newCharacterName,
        };

        if (character.value.isReal === 1) {
            setPCList([...pcList, character]);
        } else {
            setNPCList([...npcList, character]);
        }

        // Add notification to let user know new character has been added
        const newNotification = {
            message: `${newCharacterName} has been added to the select ${
                character.value.isReal === 1 ? "pcs" : "npcs"
            } list!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // De-render AddNewCharacter component and reset all relevant state values
        setRenderNewCharacterForm(false);
        setNewCharacterName("");
        setNewCharacterClass("");
        setNewCharacterIsPlayerCharacter(null);
    };

    return (
        <>
            {" "}
            <div className="location-notes-create first-input">
                <label htmlFor="instance-name">
                    Instance name:
                    <input
                        id="instance-name"
                        type="string"
                        required
                        defaultValue={instanceName}
                        onChange={({ target }) => {
                            setInstanceName(target.value);
                        }}
                    />
                </label>
            </div>
            <div className="location-notes-create">
                <label htmlFor="instance-description">
                    Instance Description:
                    <textarea
                        id="instance-description"
                        type="text"
                        defaultValue={instanceDescription}
                        onChange={({ target }) => {
                            setInstanceDescription(target.value);
                        }}
                    />
                </label>
            </div>
            <div className="location-notes-create">
                <label>
                    Select player characters:
                    {pcSelection()}
                </label>
                <label>
                    Select non-player characters:
                    {npcSelection()}
                </label>
                <p>Missing a character?</p>
                <button onClick={() => setRenderNewCharacterForm(true)}>
                    Add them here!
                </button>
            </div>
            {/* Has the add new character button been clicked? */}
            {renderNewCharacterForm === true ? (
                <AddNewCharacter
                    newCharacterName={newCharacterName}
                    setNewCharacterName={setNewCharacterName}
                    newCharacterClass={newCharacterClass}
                    setNewCharacterClass={setNewCharacterClass}
                    newCharacterIsPlayerCharacter={
                        newCharacterIsPlayerCharacter
                    }
                    setNewCharacterIsPlayerCharacter={
                        setNewCharacterIsPlayerCharacter
                    }
                    addNewCharacterValues={addNewCharacterValues}
                    setRenderNewCharacterForm={setRenderNewCharacterForm}
                />
            ) : null}{" "}
        </>
    );
};

export default InstanceDetails;
