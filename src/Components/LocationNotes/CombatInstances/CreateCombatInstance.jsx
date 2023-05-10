import { useState } from "react";
import Select from "react-select";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
} from "../../../imports/imports";

// Component imports
import TurnStats from "./TurnStats";
import InstanceDetails from "./InstanceDetails";

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

    // Instance data states
    const [turns, setTurns] = useState([1]);
    const [playerList, setPlayerList] = useState(
        campaign.campaign.players.map((player) => {
            return {
                value: {
                    name: player.name,
                    class: player.class,
                    turns: {
                        damage: [0],
                        healing: [0],
                    },
                },
                label: player.name,
            };
        })
    );
    const [instanceName, setInstanceName] = useState("");
    const [instanceDescription, setInstanceDescription] = useState("");
    const [instancePlayerDetails, setInstancePlayerDetails] = useState(null);

    // Render new character inputs state value
    const [renderNewCharacterForm, setRenderNewCharacterForm] = useState(false);

    // Send POST request to create a new Combat Instance at this location
    const postInstanceData = async () => {
        // e.preventDefault();

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
            selectedPlayerList.map((player) => {
                // Add right amount of turns for damage and healing arrays.
                if (player.value.turns.damage.length !== turns.length) {
                    player.value.turns.damage.length = turns.length;
                    player.value.turns.damage.fill(0);
                    player.value.turns.healing.length = turns.length;
                    player.value.turns.healing.fill(0);
                }

                return player.value;
            })
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
                    <InstanceDetails
                        instanceName={instanceName}
                        setInstanceName={setInstanceName}
                        instanceDescription={instanceDescription}
                        setInstanceDescription={setInstanceDescription}
                        turns={turns}
                        playerList={playerList}
                        setPlayerList={setPlayerList}
                        handleSelectedPlayersChange={
                            handleSelectedPlayersChange
                        }
                        instancePlayerDetails={instancePlayerDetails}
                        renderNewCharacterForm={renderNewCharacterForm}
                        setRenderNewCharacterForm={setRenderNewCharacterForm}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                    <TurnStats
                        turns={turns}
                        setTurns={setTurns}
                        instancePlayerDetails={instancePlayerDetails}
                        setInstancePlayerDetails={setInstancePlayerDetails}
                        postInstanceData={postInstanceData}
                    />
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
