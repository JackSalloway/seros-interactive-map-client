import { titleCase } from "../../../imports/imports";

const PlayerTurnInputs = (props) => {
    const { player, turnType, turnValue, playerIndex, updatePlayerTurnDetail } =
        props;

    return (
        <label htmlFor={player.name + "-damage"}>
            {titleCase(turnType)}
            <input
                id={player.name + `-${turnType}`}
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
