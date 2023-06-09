import DamageNumbers from "./DamageNumbers";
import HealingNumbers from "./HealingNumbers";
import "./PlayerBar.css";

const PlayerBar = (props) => {
    const {
        player,
        position,
        selectedStat,
        totalInstanceDamage,
        totalInstanceHealing,
        highestDamage,
        highestHealing,
    } = props;

    const lowerCaseClass = player.player_class.toLowerCase().replace(" ", "-");
    const playerBarClassName = "player-meter-bar-class " + lowerCaseClass;

    const getTotal = (valueArray) => {
        return valueArray.reduce((prevValue, currentValue) => {
            return prevValue + currentValue;
        });
    };

    // Damage stats
    // const damageTotal = getTotal(player.turns.damage);
    const damagePerTurn = Number.parseFloat(
        player.damage_total / player.turns.damage.length
    ).toFixed(1);
    const damagePercentage = Number.parseFloat(
        (player.damage_total / totalInstanceDamage) * 100
    ).toFixed(1);
    const damageBarLengthPercentage =
        Number.parseFloat(player.damage_total / highestDamage) * 100 + "%";

    // Healing Stats
    // const healingTotal = getTotal(player.turns.healing);
    const healingPerTurn = Number.parseFloat(
        player.healing_total / player.turns.healing.length
    ).toFixed(1);
    let healingPercentage = Number.parseFloat(
        (player.healing_total / totalInstanceHealing) * 100
    ).toFixed(1);
    const healingBarLengthPercentage =
        Number.parseFloat(player.healing_total / highestHealing) * 100 + "%";

    if (healingPercentage === "NaN") healingPercentage = 0;

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
                    height: "1.5rem",
                }}
            />
            <div className="player-meter-bar-name">
                <p>{position}. </p>
                <p>{player.player_name}</p>
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
