import { titleCase } from "../../../imports/imports";

const PlayerTurnInputs = (props) => {
    const { player, turnType, turnValue, playerIndex, updatePlayerTurnDetail } =
        props;

    return (
        <label htmlFor={player.player_name + `-${turnType}`}>
            {titleCase(turnType)}
            <input
                id={player.player_name + `-${turnType}`}
                type="number"
                defaultValue={turnValue}
                onChange={({ target }) =>
                    updatePlayerTurnDetail(target.value, playerIndex, turnType)
                }
            />
        </label>
    );
};

export default PlayerTurnInputs;
