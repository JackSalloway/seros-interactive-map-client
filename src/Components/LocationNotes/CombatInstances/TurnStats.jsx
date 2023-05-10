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
        // Add new index to turns array
        setTurns([...turns, turns.length + 1]);
        // Set current turn to latest turn (this change may be reverted later)
        setCurrentTurn(turns.length);
        // Add another value to both damage and healing arrays for all characters
        const instancePlayerDetailsCopy = instancePlayerDetails;
        instancePlayerDetailsCopy.map((player) => {
            player.turns.damage.push(0);
            player.turns.healing.push(0);
            return player;
        });
        setInstancePlayerDetails(instancePlayerDetailsCopy);
    };
    const removeTurn = () => {
        // Prevent user removing turns if only one turn exists
        if (turns.length === 1) return;
        // Update the current turn state value if the user is on the last turn
        if (currentTurn === turns.length - 1) setCurrentTurn(currentTurn - 1);
        // Remove the last index from the turns array
        const turnsCopy = turns;
        turnsCopy.pop();
        setTurns([...turnsCopy]);
        // Remove last index from player damage / healing arrays
        const instancePlayerDetailsCopy = instancePlayerDetails;
        instancePlayerDetailsCopy.map((player) => {
            player.turns.damage.pop();
            player.turns.healing.pop();
            return player;
        });
        setInstancePlayerDetails(instancePlayerDetailsCopy);
    };
    const nextTurn = () => {
        if (turns.length === currentTurn - 1) return; // Prevent user from going to next turn if they are on the last turn
        setCurrentTurn(currentTurn + 1);
    };
    const previousTurn = () => {
        if (turns.length === 1) return; // Prevent user from going to previous turn if only one turn exists
        setCurrentTurn(currentTurn - 1);
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
                    Remove last turn
                </button>

                <button
                    disabled={currentTurn === 0 ? true : false}
                    onClick={() => {
                        previousTurn();
                    }}
                >
                    Previous turn
                </button>

                <button
                    disabled={turns.length === currentTurn + 1 ? true : false}
                    onClick={() => {
                        nextTurn();
                    }}
                >
                    Next turn
                </button>

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
