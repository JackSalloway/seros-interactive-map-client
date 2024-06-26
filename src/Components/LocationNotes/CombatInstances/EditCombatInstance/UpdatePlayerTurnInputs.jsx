import { titleCase } from "../../../../imports/imports";

const UpdatePlayerTurnInputs = (props) => {
    const { player, turnType, turnValue, playerIndex, updatePlayerTurnDetail } =
        props;

    return (
        <label
            htmlFor={player.player_name + `-${turnType}`}
            className="player-turn-input-label"
        >
            {titleCase(turnType)}
            <input
                id={player.player_name + `-${turnType}`}
                className="player-turn-input-input"
                type="number"
                defaultValue={turnValue[turnType]}
                onChange={({ target }) =>
                    updatePlayerTurnDetail(target.value, playerIndex, turnType)
                }
            />
        </label>
    );
};

export default UpdatePlayerTurnInputs;
