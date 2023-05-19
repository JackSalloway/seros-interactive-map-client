import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import dayjs from "dayjs";
import Separator from "../Separator/Separator";

import "./CombatInstanceNotes.css";

const CombatInstanceNotes = (props) => {
    const { instance, setDeleteData } = props;

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    const [editing, setEditing] = useState(false);

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
                            <p>{instance.description}</p>
                        ) : null}
                        {instance.combat_details.map((player) => {
                            const lowerCaseClass = player.player_class
                                .toLowerCase()
                                .replace(" ", "-");

                            const getTotal = (valueArray) => {
                                return valueArray.reduce(
                                    (prevValue, currentValue) => {
                                        return prevValue + currentValue;
                                    }
                                );
                            };

                            const damageTotal = getTotal(player.turns.damage);
                            const healingTotal = getTotal(player.turns.healing);

                            console.log(
                                player.player_name,
                                "damage: ",
                                damageTotal
                            );
                            console.log(
                                player.player_name,
                                "healing: ",
                                healingTotal
                            );

                            return (
                                // this is just temporary code to display the values listed
                                <div
                                    key={player._id}
                                    className={lowerCaseClass}
                                >
                                    <p>
                                        {player.player_name}:{" "}
                                        {player.player_class}
                                    </p>
                                    <div>
                                        <p>Damage:</p>
                                        {player.turns.damage.map(
                                            (turnDamage, index) => (
                                                <p key={player._id + index}>
                                                    {turnDamage}
                                                </p>
                                            )
                                        )}
                                    </div>
                                    <div>
                                        <p>Healing:</p>
                                        {player.turns.healing.map(
                                            (turnHealing, index) => (
                                                <p key={player._id + index}>
                                                    {turnHealing}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombatInstanceNotes;
