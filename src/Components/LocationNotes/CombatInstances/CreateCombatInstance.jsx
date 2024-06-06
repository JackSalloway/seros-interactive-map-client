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
    const [pcList, setPCList] = useState(null);
    const [selectedPCs, setSelectedPCs] = useState([]);
    const [npcList, setNPCList] = useState(null);
    const [selectedNPCs, setSelectedNPCs] = useState([]);
    const [turns, setTurns] = useState([1]);
    const [instanceName, setInstanceName] = useState("");
    const [instanceDescription, setInstanceDescription] = useState("");
    const [instanceStats, setInstanceStats] = useState([]);

    // Render new character inputs state value
    const [renderNewCharacterForm, setRenderNewCharacterForm] = useState(false);

    // Valid form values state
    const [validFormData, setValidFormData] = useState(false);

    // Set pcList and npcList state values
    useEffect(() => {
        setPCList(
            players.pcs.map((pc) => {
                return {
                    value: {
                        id: pc.id,
                        name: pc.name,
                        class: pc.class,
                        isReal: pc.is_real,
                        turns: {
                            damage: [0],
                            healing: [0],
                        },
                    },
                    label: pc.name,
                };
            })
        );

        setNPCList(
            players.npcs.map((npc) => {
                return {
                    value: {
                        id: npc.id,
                        name: npc.name,
                        class: npc.class,
                        isReal: npc.is_real,
                        turns: {
                            damage: [0],
                            healing: [0],
                        },
                    },
                    label: npc.name,
                };
            })
        );

        // Cleanup state values when component unmounts
        return () => {
            setPCList(null);
            setNPCList(null);
        };
    }, [players]);

    // Set instanceStats state value when selectedPCs/selectedNPCs gets updated
    useEffect(() => {
        setInstanceStats([...selectedPCs, ...selectedNPCs]);
    }, [selectedNPCs, selectedPCs]);

    // Check if form values are valid to disable/enable form submit button
    useEffect(() => {
        if (
            instanceName.length > 0 &&
            instanceDescription.length > 0 &&
            instanceStats.length > 0
        ) {
            // Might need to validate the damage/healing values as at least one number above 0 may be necessary to render the stat bars.
            // Just leaving it at this for now however.
            setValidFormData(true);
        } else {
            setValidFormData(false);
        }
    }, [instanceName, instanceDescription, instanceStats]);

    // Send POST request to create a new Combat Instance at this location
    const postInstanceData = async () => {
        const instanceData = {
            instance_name: instanceName,
            instance_description: instanceDescription,
            instance_details: instanceStats,
            location_id: locationNotes.id,
            location_name: locationNotes.name,
            location_latlng: locationNotes.latlng,
            campaign_id: campaign.id,
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

        // Update combatInstances state value
        setCombatInstances([
            ...combatInstances,
            returnedData.newCombatInstance,
        ]);

        // Update players state value
        setPlayers({
            pcs: [...returnedData.players.pcs],
            npcs: [...returnedData.players.npcs],
        });

        // Add notification on successful combat instance creation
        const newNotification = {
            message: `Combat log: ${instanceName} successfully created!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog values
        setChangelog([...changelog, ...returnedData.changelogResult]);

        // De-render the new instance form
        setAddNewInstance(false);
    };

    // Function to handle changes inside the pc (player character) selection box
    const handleSelectedPCsChange = (selectedPCList) => {
        setSelectedPCs(
            selectedPCList.map((pc) => {
                // Remove or add turns to match the length of the instance
                // Remove turns
                while (pc.value.turns.damage.length > turns.length) {
                    pc.value.turns.damage.pop();
                    pc.value.turns.healing.pop();
                }

                // Add turns
                while (pc.value.turns.healing.length < turns.length) {
                    pc.value.turns.damage.push(0);
                    pc.value.turns.healing.push(0);
                }

                return pc.value;
            })
        );
    };

    // Function to handle changes inside the npc (non-player character) selection box
    const handleSelectedNPCsChange = (selectedNPClist) => {
        setSelectedNPCs(
            selectedNPClist.map((npc) => {
                // Remove or add turns to match the length of the instance
                // Remove turns
                while (npc.value.turns.damage.length > turns.length) {
                    npc.value.turns.damage.pop();
                    npc.value.turns.healing.pop();
                }

                // Add turns
                while (npc.value.turns.healing.length < turns.length) {
                    npc.value.turns.damage.push(0);
                    npc.value.turns.healing.push(0);
                }

                return npc.value;
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
                        pcList={pcList}
                        setPCList={setPCList}
                        handleSelectedPCsChange={handleSelectedPCsChange}
                        npcList={npcList}
                        setNPCList={setNPCList}
                        handleSelectedNPCsChange={handleSelectedNPCsChange}
                        instanceStats={instanceStats}
                        renderNewCharacterForm={renderNewCharacterForm}
                        setRenderNewCharacterForm={setRenderNewCharacterForm}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                    <TurnStats
                        turns={turns}
                        setTurns={setTurns}
                        instanceStats={instanceStats}
                        setInstanceStats={setInstanceStats}
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
