import { useState } from "react";

const TurnStats = (props) => {
    const {
        turns,
        setTurns,
        instancePlayerDetails,
        setInstancePlayerDetails,
        postInstanceData,
    } = props;

    // Need to loop over each instance of turns and render two sets of inputs for each player (damage & healing)
    // All inputs should have a default value of 0
    // There should be a button that allows the user to add turns
    // There should be a button that allows the user to remove turns
    // Users should be able to cycle through turns
    // There should be a submit button that sends the post request to the server

    const [currentTurn, setCurrentTurn] = useState(0);

    const addTurn = () => {
        setTurns([...turns, turns.length + 1]);
    };

    const removeTurn = () => {
        if (turns.length === 1) return; // Prevent user removing turns if there is only one turn
        const turnsCopy = turns;
        turnsCopy.pop();
        setTurns([...turnsCopy]);
    };

    if (instancePlayerDetails === null)
        return <div>Add a player to log data!</div>;

    return (
        <div>
            <div>Turn {turns[currentTurn]} </div>
            <div id="turn-buttons-wrapper">
                <button
                    disabled={turns.length === 1 ? true : false}
                    onClick={() => {
                        removeTurn();
                    }}
                >
                    Remove turn
                </button>
                <button>Previous turn</button>
                <button>Next turn</button>
                <button onClick={() => addTurn()}>Add turn</button>
            </div>
            {instancePlayerDetails.map((player, index) => {
                return (
                    <div key={player.name + index}>
                        <p>{player.name}</p>
                        <div>
                            <label htmlFor={player.name + "-damage"}>
                                damage
                                <input
                                    id={player.name + "-damage"}
                                    type="number"
                                    defaultValue={0}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor={player.name + "-healing"}>
                                healing
                                <input
                                    id={player.name + "-healing"}
                                    type="number"
                                    defaultValue={0}
                                />
                            </label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TurnStats;
