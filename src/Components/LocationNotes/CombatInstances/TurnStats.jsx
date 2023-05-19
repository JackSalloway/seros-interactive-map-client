import { useState } from "react";

import PlayerTurnInputs from "./PlayerTurnInputs";

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

    const updatePlayerTurnDetail = (inputValue, playerIndex, stat) => {
        const instancePlayerDetailsCopy = instancePlayerDetails;
        instancePlayerDetailsCopy[playerIndex].turns[stat][currentTurn] =
            Number(inputValue);
        setInstancePlayerDetails([...instancePlayerDetailsCopy]);
    };

    if (instancePlayerDetails === null)
        return <div>Add a player to log data!</div>;

    // Having an issue updating the input values as the turns progress/regress.
    // Obviously they should update to reflect whatever the current turns input value is within each instancePlayerDetails player object
    // Maybe I will have to use a useEffect hook
    // Or perhaps make components for each one of the inputs to allow for them to re-render

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
            {instancePlayerDetails.map((player, playerIndex) => {
                return (
                    <div key={player.player_name + playerIndex}>
                        <p>{player.player_name}</p>
                        <div>
                            {/* Render damage inputs */}
                            {player.turns.damage.map((turnValue, turnIndex) => {
                                if (turnIndex === currentTurn) {
                                    return (
                                        <PlayerTurnInputs
                                            key={
                                                player.player_name +
                                                "damage" +
                                                turnIndex
                                            }
                                            player={player}
                                            turnType={"damage"}
                                            turnValue={turnValue}
                                            playerIndex={playerIndex}
                                            updatePlayerTurnDetail={
                                                updatePlayerTurnDetail
                                            }
                                        />
                                    );
                                } else return null;
                            })}
                            {/* Render healing inputs */}
                            {player.turns.healing.map(
                                (turnValue, turnIndex) => {
                                    if (turnIndex === currentTurn) {
                                        return (
                                            <PlayerTurnInputs
                                                key={
                                                    player.player_name +
                                                    "healing" +
                                                    turnIndex
                                                }
                                                player={player}
                                                turnType={"healing"}
                                                turnValue={turnValue}
                                                playerIndex={playerIndex}
                                                updatePlayerTurnDetail={
                                                    updatePlayerTurnDetail
                                                }
                                            />
                                        );
                                    } else return null;
                                }
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TurnStats;
