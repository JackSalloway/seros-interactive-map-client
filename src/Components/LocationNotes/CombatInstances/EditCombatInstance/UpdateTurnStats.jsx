import { useState } from "react";

import UpdatePlayerTurnInputs from "./UpdatePlayerTurnInputs";

// import "./TurnStats.css";

const UpdatedTurnStats = (props) => {
    const { turns, setTurns, instancePlayerDetails, setInstancePlayerDetails } =
        props;

    const [currentTurn, setCurrentTurn] = useState(0);

    const addTurn = () => {
        // Add new index to turns array
        setTurns([...turns, turns.length + 1]);
        // Set current turn to latest turn (this change may be reverted later)
        setCurrentTurn(turns.length);
        // Add another value to both damage and healing arrays for all characters
        const instancePlayerDetailsCopy = instancePlayerDetails;
        instancePlayerDetailsCopy.map((player) => {
            // Check if any turns have been removed whilst editing - Done this to keep any values from turns that have previously been removed
            if (player.removedTurns.length > 0) {
                player.turns.push(player.removedTurns.pop());
            } else {
                player.turns.push({
                    turn_number: turns.length,
                    damage: 0,
                    healing: 0,
                });
            }

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

        // Remove last index from player turns array and add it to the removedTurns array on the player object
        const instancePlayerDetailsCopy = instancePlayerDetails;
        instancePlayerDetailsCopy.map((player) => {
            player.removedTurns.push(player.turns.pop());
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
        instancePlayerDetailsCopy[playerIndex].turns[currentTurn][stat] =
            Number(inputValue);
        setInstancePlayerDetails([...instancePlayerDetailsCopy]);
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
            {instancePlayerDetails.map((player, playerIndex) => {
                return (
                    <div
                        key={player.name + playerIndex}
                        className="player-turn-inputs-wrapper"
                    >
                        <p>{player.name}</p>
                        <div className="player-turn-input-wrapper">
                            {/* Render damage inputs */}
                            {player.turns.map((turnValue, turnIndex) => {
                                if (turnIndex === currentTurn) {
                                    return (
                                        <UpdatePlayerTurnInputs
                                            key={
                                                player.name +
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
                            {player.turns.map((turnValue, turnIndex) => {
                                if (turnIndex === currentTurn) {
                                    return (
                                        <UpdatePlayerTurnInputs
                                            key={
                                                player.name +
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
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UpdatedTurnStats;
