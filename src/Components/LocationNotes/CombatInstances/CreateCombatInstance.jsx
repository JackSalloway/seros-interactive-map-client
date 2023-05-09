import { useState } from "react";
import Select from "react-select";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

// Component imports
import AddNewCharacter from "./AddNewCharacter";
import { text } from "@fortawesome/fontawesome-svg-core";
import TurnStatsForm from "./TurnStatsForm";

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
        // setChangelogData,
        username,
        // combatInstanceData,
        // setCombatInstanceData,
        dataNotifications,
        setDataNotifications,
    } = props;

    // Form step state
    const [step, setStep] = useState(1);

    // Instance data states
    const [turns, setTurns] = useState(1);
    const [playerList, setPlayerList] = useState(
        campaign.campaign.players.map((player) => {
            return {
                value: {
                    name: player.name,
                    class: player.class,
                    turns: {
                        damage: [],
                        healing: [],
                    },
                },
                label: player.name,
            };
        })
    );
    // const [playerListDetails, setPlayerListDetails] = useState([]);

    // New Character values states
    const [renderNewCharacterForm, setRenderNewCharacterForm] = useState(false);
    const [newCharacterName, setNewCharacterName] = useState("");
    const [newCharacterClass, setNewCharacterClass] = useState("");
    const [newCharacterIsPlayerCharacter, setNewCharacterIsPlayerCharacter] =
        useState(null);

    // POST data states
    const [instanceName, setInstanceName] = useState("");
    const [instanceDescription, setInstanceDescription] = useState("");
    const [instancePlayerDetails, setInstancePlayerDetails] = useState({});

    // Send POST request to create a new Combat Instance at this location
    const postInstanceData = async () => {
        // e.preventDefault();

        console.log(playerList);

        const instanceData = {
            instance_name: instanceName,
            instance_desc: instanceDescription,
            instance_details: instancePlayerDetails,
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
        setInstancePlayerDetails(
            selectedPlayerList.map((player) => player.value)
        );
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
                placeholder="Select involved players..."
                defaultValue={null ?? instancePlayerDetails}
            />
        );
    };

    const addNewCharacterValues = () => {
        // Update player list state value
        setPlayerList([
            ...playerList,
            {
                value: { name: newCharacterName, class: newCharacterClass },
                label: newCharacterName,
                player_character: newCharacterIsPlayerCharacter,
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
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
            <div className="location-notes-details location-notes-brighter-filter">
                <div className="location-notes-form combat-instance-form">
                    {/* Render relevant form step */}
                    {step === 1 ? (
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
                                            setInstanceDescription(
                                                target.value
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="location-notes-create">
                                <label htmlFor="instance-players">
                                    Select players:
                                    {playerSelection()}
                                </label>
                                <p>Missing a character?</p>
                                <button
                                    onClick={() =>
                                        setRenderNewCharacterForm(true)
                                    }
                                >
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
                                    addNewCharacterValues={
                                        addNewCharacterValues
                                    }
                                    setRenderNewCharacterForm={
                                        setRenderNewCharacterForm
                                    }
                                />
                            ) : null}{" "}
                        </>
                    ) : (
                        <TurnStatsForm />
                    )}

                    {/* Form progression buttons */}
                    <button
                        disabled={step === 1 ? true : false}
                        onClick={() => setStep(1)}
                    >
                        Previous step!
                    </button>
                    <button
                        disabled={step === 2 ? true : false}
                        onClick={() => setStep(2)}
                    >
                        Next step!
                    </button>
                </div>
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

export default CreateCombatInstance;
