import { useState } from "react";
import Select from "react-select";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

// Component imports
import TurnStatsForm from "./TurnStatsForm";
import InstanceDetailsForm from "./InstanceDetailsForm";

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
    const [instancePlayerDetails, setInstancePlayerDetails] = useState(null);

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
                        <InstanceDetailsForm
                            instanceName={instanceName}
                            setInstanceName={setInstanceName}
                            instanceDescription={instanceDescription}
                            setInstanceDescription={setInstanceDescription}
                            playerList={playerList}
                            setPlayerList={setPlayerList}
                            handleSelectedPlayersChange={
                                handleSelectedPlayersChange
                            }
                            instancePlayerDetails={instancePlayerDetails}
                            renderNewCharacterForm={renderNewCharacterForm}
                            setRenderNewCharacterForm={
                                setRenderNewCharacterForm
                            }
                            dataNotifications={dataNotifications}
                            setDataNotifications={setDataNotifications}
                        />
                    ) : (
                        <TurnStatsForm
                            turns={turns}
                            setTurns={setTurns}
                            instancePlayerDetails={instancePlayerDetails}
                            setInstancePlayerDetails={setInstancePlayerDetails}
                            postInstanceData={postInstanceData}
                        />
                    )}

                    {/* Form progression buttons */}
                    {/* Need to add logic to prevent user from moving to second step if no players are added into the list */}
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
