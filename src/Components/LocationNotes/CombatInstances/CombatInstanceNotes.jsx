import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import dayjs from "dayjs";
import Separator from "../Separator/Separator";
import PlayerBar from "./PlayerBar";
import { splitParas } from "../../../imports/imports";
import EditCombatInstance from "./EditCombatInstance/EditCombatInstance";

import "./CombatInstanceNotes.css";

function compareDamage(a, b) {
    if (a.damage_total < b.damage_total) {
        return 1;
    }
    if (a.damage_total > b.damage_total) {
        return -1;
    }
    return 0;
}

function compareHealing(a, b) {
    if (a.healing_total < b.healing_total) {
        return 1;
    }
    if (a.healing_total > b.healing_total) {
        return -1;
    }
    return 0;
}

const CombatInstanceNotes = (props) => {
    const {
        instance,
        setDeleteData,
        changelog,
        setChangelog,
        combatInstances,
        setCombatInstances,
        dataNotifications,
        setDataNotifications,
        players,
        setPlayers,
    } = props;

    const totalTurns = instance.players[0].turns.length;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const [viewTurns, setViewTurns] = useState(totalTurns);
    const [totalInstanceDamage, setTotalInstanceDamage] = useState(0);
    const [totalInstanceHealing, setTotalInstanceHealing] = useState(0);
    const [playerValues, setPlayerValues] = useState([]);
    const [orderedInstanceDetails, setOrderedInstanceDetails] = useState([]);
    const [selectedStat, setSelectedStat] = useState("damage");
    const [editing, setEditing] = useState(false);

    // Effect to isolate player values
    useEffect(() => {
        const test = instance.players.map((player) => {
            return {
                id: player.id,
                name: player.name,
                class: player.class,
                damage: player.turns.map((turn) => turn.damage),
                healing: player.turns.map((turn) => turn.healing),
            };
        });
        setPlayerValues(test);
    }, [instance]);

    // Effect to recalculate total values when the viewTurns state value is changed
    useEffect(() => {
        const getTotalValue = (statValue) => {
            const total = playerValues
                .map((player) => {
                    return player[statValue].reduce(
                        (prevNum, currentNum, currentIndex) => {
                            if (viewTurns < currentIndex + 1) return prevNum;
                            return prevNum + currentNum;
                        },
                        0
                    );
                })
                .reduce((a, b) => a + b, 0);
            return total;
        };

        setTotalInstanceDamage(getTotalValue("damage", viewTurns));
        setTotalInstanceHealing(getTotalValue("healing", viewTurns));
    }, [playerValues, viewTurns]);

    // Effect to reorder instance details depending on highest dps/hps
    useEffect(() => {
        if (playerValues.length === 0) return;

        const sortInstanceDetails = (instanceArray) => {
            return instanceArray.map((player) => {
                player.damage_total = player.damage.reduce(
                    (prev, current, currentIndex) => {
                        if (viewTurns < currentIndex + 1) return prev;
                        return prev + current;
                    }
                );
                player.healing_total = player.healing.reduce(
                    (prev, current, currentIndex) => {
                        if (viewTurns < currentIndex + 1) return prev;
                        return prev + current;
                    }
                );
                return player;
            });
        };

        if (selectedStat === "damage") {
            setOrderedInstanceDetails(
                sortInstanceDetails(playerValues).sort(compareDamage)
            );
        } else {
            setOrderedInstanceDetails(
                sortInstanceDetails(playerValues).sort(compareHealing)
            );
        }
    }, [playerValues, selectedStat, viewTurns]);

    // Functions to increase/decrease viewTurns state value
    const incrementViewTurns = () => {
        if (viewTurns === totalTurns) return;
        setViewTurns(viewTurns + 1);
        return;
    };

    const decrementViewTurns = () => {
        if (viewTurns === 1) return;
        setViewTurns(viewTurns - 1);
        return;
    };

    // Combat instance has not been selected:
    if (selected === false) {
        return (
            <div className="location-notes-details">
                <div
                    className="location-notes-details-border top"
                    style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
                />
                <div
                    className="location-notes-details-header details-closed location-notes-brighter-filter"
                    style={{ backgroundImage: `url(/images/papyr.jpg)` }}
                >
                    <h4>{he.decode(instance.name)}</h4>
                    <FontAwesomeIcon
                        icon="chevron-down"
                        className="journal-fa-icon"
                        onClick={() => {
                            setSelected(!selected);
                        }}
                    />
                </div>
                <div
                    className="location-notes-details-border bottom"
                    style={{
                        backgroundImage: `url(/images/statblockbar.jpg)`,
                    }}
                />
            </div>
        );
    }

    const openCombatInstance = (
        <div className="location-notes-details">
            <div
                className="location-notes-details-border top"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
            <div
                className="location-notes-details location-notes-brighter-filter location-notes-open-internal"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundImage: `url(/images/papyr.jpg)` }}
            >
                <div className="details-open">
                    <div className="location-notes-open-header-wrapper">
                        <div className="location-notes-details-data-section name-section">
                            <h4>{he.decode(instance.name)}</h4>
                            <p>
                                {dayjs(instance.created_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="location-notes-open-icons-wrapper">
                        <FontAwesomeIcon
                            icon="chevron-up"
                            className="journal-fa-icon"
                            onClick={() => {
                                setSelected(false);
                            }}
                        />
                        {hover === true ? (
                            <div className="notes-button-wrapper hovered">
                                <FontAwesomeIcon
                                    icon="pencil"
                                    className="journal-fa-icon"
                                    onClick={() => setEditing(true)}
                                />
                                <FontAwesomeIcon
                                    icon="trash-can"
                                    className="journal-fa-icon"
                                    onClick={() => setDeleteData(instance)}
                                />
                            </div>
                        ) : (
                            <div className="notes-button-wrapper unhovered">
                                <FontAwesomeIcon
                                    icon="pencil"
                                    className="journal-fa-icon"
                                />
                                <FontAwesomeIcon
                                    icon="trash-can"
                                    className="journal-fa-icon"
                                />
                            </div>
                        )}
                    </div>
                    <div className="location-notes-open-details-wrapper">
                        <Separator />

                        <div className="location-notes-instance-description-wrapper">
                            <p>{totalTurns} turn combat instance</p>
                            {/* Check if there is a description for the instance present */}
                            {instance.description
                                ? splitParas(instance.description).map(
                                      (para, index) => {
                                          return (
                                              <p
                                                  key={index}
                                                  className="location-notes-description-paragraph"
                                              >
                                                  {he.decode(para)}
                                              </p>
                                          );
                                      }
                                  )
                                : null}
                        </div>

                        <Separator />

                        <div className="location-notes-instance-meters-wrapper">
                            <div className="location-notes-instance-meter-header">
                                <FontAwesomeIcon
                                    icon="chevron-left"
                                    className="journal-fa-icon"
                                    onClick={() => decrementViewTurns()}
                                />
                                <h4>Turn {viewTurns}</h4>
                                <FontAwesomeIcon
                                    icon="chevron-right"
                                    className="journal-fa-icon"
                                    onClick={() => incrementViewTurns()}
                                />

                                <button
                                    onClick={() => {
                                        if (selectedStat === "damage") {
                                            setSelectedStat("healing");
                                            setOrderedInstanceDetails([
                                                ...orderedInstanceDetails.sort(
                                                    compareHealing
                                                ),
                                            ]);
                                        } else {
                                            setSelectedStat("damage");
                                            setOrderedInstanceDetails([
                                                ...orderedInstanceDetails.sort(
                                                    compareDamage
                                                ),
                                            ]);
                                        }
                                    }}
                                >
                                    {selectedStat === "damage"
                                        ? "Show heals"
                                        : "Show damage"}
                                </button>
                            </div>
                            {orderedInstanceDetails.map((player, index) => {
                                return (
                                    <PlayerBar
                                        key={player.id}
                                        player={player}
                                        position={index + 1}
                                        selectedStat={selectedStat}
                                        totalInstanceDamage={
                                            totalInstanceDamage
                                        }
                                        totalInstanceHealing={
                                            totalInstanceHealing
                                        }
                                        highestDamage={
                                            orderedInstanceDetails[0]
                                                .damage_total
                                        }
                                        highestHealing={
                                            orderedInstanceDetails[0]
                                                .healing_total
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="location-notes-details-border bottom"
                style={{ backgroundImage: `url(/images/statblockbar.jpg)` }}
            />
        </div>
    );

    // Combat instance has been selected
    return !editing ? (
        openCombatInstance
    ) : (
        <EditCombatInstance
            instance={instance}
            changelog={changelog}
            setChangelog={setChangelog}
            combatInstances={combatInstances}
            setCombatInstances={setCombatInstances}
            dataNotifications={dataNotifications}
            setDataNotifications={setDataNotifications}
            players={players}
            setPlayers={setPlayers}
            setEditing={setEditing}
        />
    );
};

// changelog,
//         setChangelog,
//         combatInstances,
//         setCombatInstances,
//         dataNotifications,
//         setDataNotifications,
//         players,
//         setPlayers,

export default CombatInstanceNotes;
