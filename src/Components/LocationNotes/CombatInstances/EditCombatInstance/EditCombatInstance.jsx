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
        setPlayers,
        setEditing,
        username,
    } = props;

    const [listsLoaded, setListsLoaded] = useState(false);
    const [defaultSelectionLoaded, setDefaultSelectionLoaded] = useState(false);

    const [turns, setTurns] = useState(
        Array(instance.players[0].turns.length)
            .fill()
            .map((_, index) => index + 1)
    );
    const [instanceName, setInstanceName] = useState("");
    const [instanceDescription, setInstanceDescription] = useState("");

    // Render new character inputs state value
    const [renderNewCharacterForm, setRenderNewCharacterForm] = useState(false);

    // PC and NPC list state values
    const [pcList, setPCList] = useState(null);
    const [selectedPCs, setSelectedPCs] = useState(null);
    const [npcList, setNPCList] = useState(null);
    const [selectedNPCs, setSelectedNPCs] = useState(null);
    const [selectedCharacterIds, setSelectedCharacterIds] = useState([]);
    const [instanceStats, setInstanceStats] = useState([]);
    const [removedCharacters, setRemovedCharacters] = useState([]);

    // Set initial form values and cleanup on component unmount
    useEffect(() => {
        setInstanceName(instance.name);
        setInstanceDescription(instance.description);

        // Cleanup state values when component unmounts
        return () => {
            // setTurns([]); - This setState value causes the turns to be reset after adding a pc/npc not entirely sure why, so have removed it for now, functionality still works the same anyway
            setInstanceName("");
            setInstanceDescription("");
            setRenderNewCharacterForm(false);
            setRemovedCharacters([]);
        };
    }, [instance]);

    // Set pcList and npcList state values on initial render
    useEffect(() => {
        if (listsLoaded === false && turns.length !== 0) {
            setPCList(
                players.pcs.map((pc) => {
                    // Set default values for turnValue and foundational variables
                    let turnValue = Array(turns.length)
                        .fill()
                        .map((_, index) => {
                            return {
                                turn_number: index + 1,
                                damage: 0,
                                healing: 0,
                            };
                        });
                    let originalCharacter = false; // Used to discern if the character was already in the instance before the edit form was opened

                    // Check if player character was in the instance before the edit form was opened
                    const originalPC = instance.players.filter(
                        (player) => player.id === pc.id
                    );

                    // If player character was in the instance to begin with, set the turns value to its original value
                    if (originalPC.length === 1) {
                        turnValue = originalPC[0].turns;
                        originalCharacter = true;
                    }

                    return {
                        value: {
                            id: pc.id,
                            name: pc.name,
                            class: pc.class,
                            isReal: pc.is_real,
                            removedTurns: [],
                            foundational: originalCharacter,
                            turns: turnValue,
                        },
                        label: pc.name,
                    };
                })
            );

            setNPCList(
                players.npcs.map((npc) => {
                    // Set default values for turnValue and foundational variables
                    let turnValue = Array(turns.length)
                        .fill()
                        .map((_, index) => {
                            return {
                                turn_number: index + 1,
                                damage: 0,
                                healing: 0,
                            };
                        });
                    let originalCharacter = false; // Used to discern if the character was already in the instance before the edit form was opened

                    // Check if non-player-character was in the instance before the edit form was opened
                    const originalNPC = instance.players.filter(
                        (player) => player.id === npc.id
                    );

                    // If non-player character was in the instance to begin with, set the turns value to its original value
                    if (originalNPC.length === 1) {
                        turnValue = originalNPC[0].turns;
                        originalCharacter = true;
                    }

                    return {
                        value: {
                            id: npc.id,
                            name: npc.name,
                            class: npc.class,
                            isReal: npc.is_real,
                            removedTurns: [],
                            foundational: originalCharacter,
                            turns: turnValue,
                        },
                        label: npc.name,
                    };
                })
            );

            setListsLoaded(true);
        }
    }, [listsLoaded, players, instance, turns]);

    //Set default values for selectedPCs and selectedNPCs, and remove the default values from the pcList and npcList respectively
    useEffect(() => {
        if (
            defaultSelectionLoaded === false &&
            pcList !== null &&
            npcList !== null
        ) {
            setSelectedPCs(
                pcList.filter((pc) => pc.value.foundational === true)
            );
            const pcListCopy = pcList;
            pcListCopy.filter((pc) => pc.value.foundational === false);
            setPCList(pcListCopy);

            setSelectedNPCs(
                npcList.filter((npc) => npc.value.foundational === true)
            );
            const npcListCopy = npcList;
            npcListCopy.filter((npc) => npc.value.foundational === false);
            setNPCList(npcListCopy);

            setDefaultSelectionLoaded(true);
        }
    }, [defaultSelectionLoaded, pcList, npcList]);

    // Set instanceStats state value when selectedPCs/selectedNPCs gets updated
    useEffect(() => {
        if (selectedPCs !== null && selectedNPCs !== null) {
            setInstanceStats([
                ...selectedPCs.map((pc) => pc.value),
                ...selectedNPCs.map((npc) => npc.value),
            ]);
        }
    }, [selectedNPCs, selectedPCs]);

    // Update selected player id array when a player is unselected
    useEffect(() => {
        if (selectedPCs !== null && selectedNPCs !== null) {
            const selectedPCIds = selectedPCs.map((pc) => pc.value.id);
            const selectedNPCIds = selectedNPCs.map((npc) => npc.value.id);

            setSelectedCharacterIds([...selectedPCIds, ...selectedNPCIds]);
        }
    }, [selectedPCs, selectedNPCs]);

    // Update removed characters array when a character is unselected
    useEffect(() => {
        setRemovedCharacters(
            combatInstances[originalIndex].players
                .map((character) => {
                    return {
                        id: character.id,
                        turnIds: character.turns.map((turn) => {
                            return turn.id;
                        }),
                    };
                })
                .filter((character) => {
                    return !selectedCharacterIds.includes(character.id);
                })
        );
    }, [combatInstances, originalIndex, selectedCharacterIds]);

    // Function to handle changes inside the pc (player character) selection box
    const handleSelectedPCsChange = (selectedPCList) => {
        setSelectedPCs(selectedPCList);
    };

    // Function to handle changes inside the npc (non-player character) selection box
    const handleSelectedNPCsChange = (selectedNPCList) => {
        setSelectedNPCs(selectedNPCList);
    };

    const updateInstanceData = async () => {
        const data = {
            instance_id: instance.id,
            instance_name: instanceName,
            instance_description: instanceDescription,
            instance_details: instanceStats,
            removed_player_turn_ids: removedCharacters
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

        // Update players state value
        setPlayers({
            pcs: [...returnedData.players.pcs],
            npcs: [...returnedData.players.npcs],
        });

        // Add a data notification showing that the combat instance has been updated
        const newNotification = {
            message: `Instance: ${instanceName}, successfully updated!`,
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
                        pcList={pcList}
                        setPCList={setPCList}
                        selectedPCs={selectedPCs}
                        handleSelectedPCsChange={handleSelectedPCsChange}
                        npcList={npcList}
                        setNPCList={setNPCList}
                        selectedNPCs={selectedNPCs}
                        handleSelectedNPCsChange={handleSelectedNPCsChange}
                        instanceStats={instanceStats}
                        renderNewCharacterForm={renderNewCharacterForm}
                        setRenderNewCharacterForm={setRenderNewCharacterForm}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                    <UpdatedTurnStats
                        turns={turns}
                        setTurns={setTurns}
                        instanceStats={instanceStats}
                        setInstanceStats={setInstanceStats}
                        pcList={pcList}
                        setPCList={setPCList}
                        npcList={npcList}
                        setNPCList={setNPCList}
                    />
                    <button
                        // disabled={!validFormData}
                        className="location-notes-submit"
                        onClick={() => updateInstanceData()}
                    >
                        Update instance!
                    </button>
                    {/* <button onClick={() => logValues()}>log values</button> */}
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
