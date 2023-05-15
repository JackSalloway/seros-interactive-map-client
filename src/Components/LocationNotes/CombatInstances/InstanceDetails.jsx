import { useState } from "react";
import Select from "react-select";
import { customStyles } from "../../../imports/imports";

import AddNewCharacter from "./AddNewCharacter";

const InstanceDetails = (props) => {
    const {
        instanceName,
        setInstanceName,
        instanceDescription,
        setInstanceDescription,
        turns,
        playerList,
        setPlayerList,
        handleSelectedPlayersChange,
        instancePlayerDetails,
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
                placeholder="Select involved players..."
                defaultValue={null ?? instancePlayerDetails}
            />
        );
    };

    const addNewCharacterValues = () => {
        // Update player list state value
        // Create damage array with correct ammount of turns
        const damageArray = [];
        damageArray.length = turns.length;
        damageArray.fill(0);
        // Create healing array with correct ammount of turns
        const healingArray = [];
        healingArray.length = turns.length;
        healingArray.fill(0);
        setPlayerList([
            ...playerList,
            {
                value: {
                    player_name: newCharacterName,
                    player_class: newCharacterClass,
                    player_character: newCharacterIsPlayerCharacter,
                    turns: { damage: damageArray, healing: healingArray },
                },
                label: newCharacterName,
            },
        ]);
        // Add notification to let user know new character has been added
        const notificationsCopy = dataNotifications;
        notificationsCopy.push({
            message: `${newCharacterName} has been added to the select players list!`,
            important: false,
        });
        setDataNotifications([...notificationsCopy]);
        // De-render AddNewCharacter component and reset all relevant state values
        setRenderNewCharacterForm(false);
        setNewCharacterName("");
        setNewCharacterClass("");
        setNewCharacterIsPlayerCharacter(null);
    };

    return (
        <>
            {" "}
            <div className="location-notes-create">
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
                    Select players:
                    {playerSelection()}
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
