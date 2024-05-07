import { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../../imports/imports";

// Component imports
import TurnStats from "./TurnStats";
import InstanceDetails from "./InstanceDetails";

const CreateCombatInstance = (props) => {
    const {
        locationNotes,
        campaign,
        changelog,
        setChangelog,
        username,
        combatInstances,
        setCombatInstances,
        dataNotifications,
        setDataNotifications,
        setAddNewInstance,
        players,
        setPlayers,
    } = props;

    // Instance data states
    const [turns, setTurns] = useState([1]);
    const [playerList, setPlayerList] = useState(
        players.map((player) => {
            return {
                value: {
                    id: player.id,
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

    // Valid form values state
    const [validFormData, setValidFormData] = useState(false);

    // Check if form values are valid to disable/enable form submit button
    useEffect(() => {
        if (instanceName.length > 0 && instancePlayerDetails !== null) {
            // Might need to validate the damage/healing values as at least one number above 0 may be necessary to render the stat bars.
            // Just leaving it at this for now however.
            setValidFormData(true);
        } else {
            setValidFormData(false);
        }
    }, [instanceName, instancePlayerDetails]);

    // Send POST request to create a new Combat Instance at this location
    const postInstanceData = async () => {
        // e.preventDefault();

        const instanceData = {
            instance_name: instanceName,
            instance_desc: instanceDescription,
            instance_details: instancePlayerDetails,
            instance_location_id: locationNotes.id,
            instance_location_name: locationNotes.name,
            instance_location_latlng: locationNotes.latlng,
            instance_campaign_id: campaign.campaign_id,
            username: username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(instanceData),
            mode: "cors",
            credentials: "include",
        };

        // Await and update combat instance data for the campaign
        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/create_combat_instance`,
            init
        );
        const returnedData = await result.json();

        setCombatInstances([
            ...combatInstances,
            returnedData.newCombatInstance,
        ]);

        // Add notification on successful combat instance creation
        const newNotification = {
            message: `Combat log: ${instanceName} successfully created!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog values
        setChangelog([...changelog, returnedData.changelogResult]);

        // De-render the new instance form
        setAddNewInstance(false);
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
                    />
                    <button
                        disabled={!validFormData}
                        className="location-notes-submit"
                        onClick={() => postInstanceData()}
                    >
                        Create instance!
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
