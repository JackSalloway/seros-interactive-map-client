import React, { useState, useEffect } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../../../imports/imports";
import UpdateInstanceDetails from "./UpdateInstanceDetails";
import UpdatedTurnStats from "./UpdateTurnStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditCombatInstance = (props) => {
    const {
        instance,
        originalIndex,
        changelog,
        setChangelog,
        combatInstances,
        setCombatInstances,
        dataNotifications,
        setDataNotifications,
        players,
        // setPlayers,
        setEditing,
        username,
    } = props;

    const [turns, setTurns] = useState([]);
    const [instanceName, setInstanceName] = useState("");
    const [instanceDescription, setInstanceDescription] = useState("");

    // Render new character inputs state value
    const [renderNewCharacterForm, setRenderNewCharacterForm] = useState(false);

    const [instancePlayerDetailsSelect, setInstancePlayerDetailsSelect] =
        useState(
            instance.players.map((player) => {
                return {
                    value: {
                        id: player.id,
                        name: player.name,
                        class: player.class,
                        turns: player.turns,
                        removedTurns: [],
                    },
                    label: player.name,
                };
            })
        );
    const [instancePlayerDetails, setInstancePlayerDetails] = useState([]);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
    const [unselectedPlayers, setUnselectedPlayers] = useState([]);
    const [removedPlayers, setRemovedPlayers] = useState([]);

    // Set initial form values and cleanup on component unmount
    useEffect(() => {
        setTurns(
            Array(instance.players[0].turns.length)
                .fill()
                .map((_, index) => index + 1)
        );
        setInstanceName(instance.name);
        setInstanceDescription(instance.description);

        // Cleanup state values when component unmounts
        return () => {
            setTurns([]);
            setInstanceName("");
            setInstanceDescription("");
            setRenderNewCharacterForm(false);
            setInstancePlayerDetailsSelect([]);
            setInstancePlayerDetails([]);
            setSelectedPlayerIds([]);
            setUnselectedPlayers([]);
            setRemovedPlayers([]);
        };
    }, [instance]);

    // Update selected player id array when a player is unselected
    useEffect(() => {
        setSelectedPlayerIds(
            instancePlayerDetailsSelect.map((player) => player.value.id)
        );
    }, [instancePlayerDetailsSelect]);

    // Update removed players array when a player is unselected
    useEffect(() => {
        setRemovedPlayers(
            combatInstances[originalIndex].players
                .map((player) => {
                    return {
                        id: player.id,
                        turnIds: player.turns.map((turn) => {
                            return turn.id;
                        }),
                    };
                })
                .filter((player) => {
                    return !selectedPlayerIds.includes(player.id);
                })
        );
    }, [combatInstances, originalIndex, selectedPlayerIds]);

    // Update unselected player values when a player is unselected
    useEffect(() => {
        setUnselectedPlayers(
            players
                .filter((player) => !selectedPlayerIds.includes(player.id))
                .map((player) => {
                    // Check if the player was already on the instance before opening the edit form
                    const playerExists = combatInstances[
                        originalIndex
                    ].players.filter((originalPlayer) => {
                        return originalPlayer.id === player.id;
                    });

                    let newTurns;
                    let newRemovedTurns = [];

                    if (playerExists.length !== 0) {
                        // Set value of newTurns variable to equal the existing value from the instance being edited
                        newTurns = Array.from(playerExists[0].turns);

                        // Add empty turn values if the original turn length is less than the current turn value in this component
                        while (newTurns.length < turns.length) {
                            newTurns.push({
                                turn_number: newTurns.length + 1,
                                damage: 0,
                                healing: 0,
                            });
                        }

                        // Remove turns if the original turn length is more than the current turn value in this component
                        while (newTurns.length > turns.length) {
                            newRemovedTurns.push(newTurns.pop());
                        }
                    } else {
                        newTurns = Array(turns.length)
                            .fill()
                            .map((_, index) => {
                                return {
                                    turn_number: index + 1,
                                    damage: 0,
                                    healing: 0,
                                };
                            });
                    }

                    return {
                        value: {
                            id: player.id,
                            name: player.name,
                            class: player.class,
                            turns: newTurns,
                            removedTurns: newRemovedTurns,
                        },
                        label: player.name,
                    };
                })
        );
    }, [players, selectedPlayerIds, turns, combatInstances, originalIndex]);

    // Isolate values from label
    useEffect(() => {
        setInstancePlayerDetails(
            instancePlayerDetailsSelect.map((player) => player.value)
        );
    }, [instancePlayerDetailsSelect]);

    // Function to handle changes inside the player selection box
    const handleSelectedPlayersChange = (selectedPlayerList) => {
        setInstancePlayerDetailsSelect(selectedPlayerList);
    };

    const updateInstanceData = async () => {
        const data = {
            instance_id: instance.id,
            instance_name: instanceName,
            instance_description: instanceDescription,
            instance_details: instancePlayerDetails,
            removed_player_turn_ids: removedPlayers
                .map((player) => {
                    return player.turnIds;
                })
                .flat(),
            campaign_id: instance.campaign.id,
            username: username,
        };

        const init = {
            method: "PUT",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(data),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_combat_instance`,
            init
        );
        const returnedData = await result.json();

        // Update the relevant combat instance
        let combatInstancesCopy = [...combatInstances];
        combatInstancesCopy[originalIndex] = returnedData.combatInstanceResult;
        setCombatInstances(combatInstancesCopy);

        // Add a data notification showing that the combat instance has been updated
        const newNotification = {
            message: `NPC: ${instanceName}, successfully updated!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog
        setChangelog([...changelog, ...returnedData.changelogResult]);

        // Invert state value and cause the form to unmount
        setEditing(false);
    };

    return (
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
            <FontAwesomeIcon
                icon="fa-times"
                className="location-notes-fa-icon h3 location-notes-fa-cross"
                onClick={() => {
                    setEditing(false);
                }}
            />
            <div className="location-notes-details location-notes-brighter-filter">
                <div className="location-notes-form combat-instance-form">
                    <UpdateInstanceDetails
                        instanceName={instanceName}
                        setInstanceName={setInstanceName}
                        instanceDescription={instanceDescription}
                        setInstanceDescription={setInstanceDescription}
                        turns={turns}
                        playerList={unselectedPlayers}
                        setPlayerList={setUnselectedPlayers}
                        handleSelectedPlayersChange={
                            handleSelectedPlayersChange
                        }
                        instancePlayerDetails={instancePlayerDetailsSelect}
                        renderNewCharacterForm={renderNewCharacterForm}
                        setRenderNewCharacterForm={setRenderNewCharacterForm}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                    <UpdatedTurnStats
                        turns={turns}
                        setTurns={setTurns}
                        instancePlayerDetails={instancePlayerDetails}
                        setInstancePlayerDetails={setInstancePlayerDetails}
                    />
                    <button
                        // disabled={!validFormData}
                        className="location-notes-submit"
                        onClick={() => updateInstanceData()}
                    >
                        Update instance!
                    </button>
                </div>
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
        </div>
    );
};

export default EditCombatInstance;
