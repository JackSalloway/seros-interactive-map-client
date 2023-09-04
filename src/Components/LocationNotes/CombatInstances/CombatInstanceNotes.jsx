import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import dayjs from "dayjs";
import Separator from "../Separator/Separator";
import PlayerBar from "./PlayerBar";

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
    const { instance, setDeleteData } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const [orderedInstanceDetails, setOrderedInstanceDetails] = useState(
        instance.combat_details
            .map((player) => {
                player.damage_total = player.turns.damage.reduce(
                    (prev, current) => prev + current
                );
                player.healing_total = player.turns.healing.reduce(
                    (prev, current) => prev + current
                );
                return player;
            })
            .sort(compareDamage)
    );
    const [selectedStat, setSelectedStat] = useState("damage");

    const [editing, setEditing] = useState(false);

    // Function to get the overall value of damage/healing for the instance
    const getTotalValue = (statValue) => {
        return instance.combat_details
            .map((player) => {
                return player.turns[statValue].reduce(
                    (prevNum, currentNum) => prevNum + currentNum
                );
            })
            .reduce((prevNum, currentNum) => prevNum + currentNum);
    };

    const totalInstanceDamage = getTotalValue("damage");
    const totalInstanceHealing = getTotalValue("healing");

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

    // Combat instance has been selected
    return (
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
                        {instance.description ? (
                            <div className="location-notes-instance-description-wrapper">
                                <p>
                                    {
                                        instance.combat_details[0].turns.damage
                                            .length
                                    }{" "}
                                    turn combat instance
                                </p>
                                <p>{instance.description}</p>
                            </div>
                        ) : null}

                        <div className="location-notes-instance-meters-wrapper">
                            <div className="location-notes-instance-meter-header">
                                <FontAwesomeIcon
                                    icon="chevron-left"
                                    className="journal-fa-icon"
                                />
                                <h4>
                                    Turn{" "}
                                    {
                                        instance.combat_details[0].turns.damage
                                            .length
                                    }
                                </h4>
                                <FontAwesomeIcon
                                    icon="chevron-right"
                                    className="journal-fa-icon"
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
                                        key={
                                            player.player_name +
                                            player.player_class +
                                            index
                                        }
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
        </div>
    );
};

export default CombatInstanceNotes;
