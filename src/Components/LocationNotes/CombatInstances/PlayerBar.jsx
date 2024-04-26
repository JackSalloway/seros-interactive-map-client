import DamageNumbers from "./DamageNumbers";
import HealingNumbers from "./HealingNumbers";
import "./PlayerBar.css";

const PlayerBar = (props) => {
    const {
        player,
        position, // Might add a button to toggle this and class icons
        selectedStat,
        totalInstanceDamage,
        totalInstanceHealing,
        highestDamage,
        highestHealing,
    } = props;

    const lowerCaseClass = player.class.toLowerCase().replace(" ", "-");
    const playerBarClassName = "player-meter-bar-class " + lowerCaseClass;

    // Damage stats
    const damagePerTurn = Number.parseFloat(
        player.damage_total / player.damage.length
    ).toFixed(1);
    let damagePercentage =
        Number.parseFloat(
            (player.damage_total / totalInstanceDamage) * 100
        ).toFixed(1) + "%";
    let damageBarLengthPercentage =
        Number.parseFloat(player.damage_total / highestDamage) * 100 + "%";

    // Healing Stats
    const healingPerTurn = Number.parseFloat(
        player.healing_total / player.healing.length
    ).toFixed(1);
    let healingPercentage =
        Number.parseFloat(
            (player.healing_total / totalInstanceHealing) * 100
        ).toFixed(1) + "%";
    let healingBarLengthPercentage =
        Number.parseFloat(player.healing_total / highestHealing) * 100 + "%";

    // Whilst these events are somewhat unlikely they render NaN as the respective text value which is not intended
    if (damagePercentage === "NaN%") {
        damagePercentage = "0%";
        damageBarLengthPercentage = "0%";
    }
    if (healingPercentage === "NaN%") {
        healingPercentage = "0%";
        healingBarLengthPercentage = "0%";
    }

    return (
        // this is just temporary code to display the values listed
        <div className="player-meter-bar">
            <div
                className={playerBarClassName}
                style={{
                    width:
                        selectedStat === "damage"
                            ? damageBarLengthPercentage
                            : healingBarLengthPercentage,
                    height: "2rem",
                }}
            />
            <div className="player-meter-bar-name">
                <div
                    className="player-meter-bar-class-icon"
                    title={player.class}
                >
                    <div
                        // className={lowerCaseClass}
                        style={{
                            backgroundImage: `url(/images/class-icons/${lowerCaseClass}.png)`,
                        }}
                    ></div>
                </div>

                <p>{player.name}</p>
            </div>
            {selectedStat === "damage" ? (
                <DamageNumbers
                    damageTotal={player.damage_total}
                    damagePerTurn={damagePerTurn}
                    damagePercentage={damagePercentage}
                />
            ) : (
                <HealingNumbers
                    healingTotal={player.healing_total}
                    healingPerTurn={healingPerTurn}
                    healingPercentage={healingPercentage}
                />
            )}
        </div>

        // <div key={player._id} className={lowerCaseClass}>
        //
        //     <div>
        //         <p>Damage:</p>
        //         {player.turns.damage.map((turnDamage, index) => (
        //             <p key={player._id + index}>{turnDamage}</p>
        //         ))}
        //     </div>
        //     <div>
        //         <p>Healing:</p>
        //         {player.turns.healing.map((turnHealing, index) => (
        //             <p key={player._id + index}>{turnHealing}</p>
        //         ))}
        //     </div>
        // </div>
    );
};

export default PlayerBar;
