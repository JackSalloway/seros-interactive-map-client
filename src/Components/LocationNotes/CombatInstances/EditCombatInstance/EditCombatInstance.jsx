import React, { useState, useEffect } from "react";
import UpdateInstanceDetails from "./UpdateInstanceDetails";
import UpdatedTurnStats from "./UpdateTurnStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditCombatInstance = (props) => {
    const {
        instance,
        // changelog,
        // setChangelog,
        // combatInstances,
        // setCombatInstances,
        dataNotifications,
        setDataNotifications,
        players,
        // setPlayers,
        setEditing,
    } = props;

    const [turns, setTurns] = useState(
        Array(instance.players[0].turns.length)
            .fill()
            .map((_, index) => index + 1)
    );
    const [instanceName, setInstanceName] = useState(instance.name);
    const [instanceDescription, setInstanceDescription] = useState(
        instance.description
    );

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

    // Update selected player id array when a player is unselected
    useEffect(() => {
        setSelectedPlayerIds(
            instancePlayerDetailsSelect.map((player) => player.value.id)
        );
    }, [instancePlayerDetailsSelect]);

    // Update unselected player values when a player is unselected
    useEffect(() => {
        setUnselectedPlayers(
            players
                .filter((player) => !selectedPlayerIds.includes(player.id))
                .map((player) => {
                    return {
                        value: {
                            id: player.id,
                            name: player.name,
                            class: player.class,
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
                        label: player.name,
                    };
                })
        );
    }, [players, selectedPlayerIds, turns]);

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

    const updateInstanceData = () => {
        console.log(instancePlayerDetails);
    };

    // Note that instance details is a re-used component due to the data that it handles being much less complex than the data handled in the UpdateTurnStats component

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
