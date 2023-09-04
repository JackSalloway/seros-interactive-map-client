const DamageNumbers = (props) => {
    const { damageTotal, damagePerTurn, damagePercentage } = props;
    return (
        <div className="player-meter-bar-numbers">
            <p title="Total player damage">{damageTotal}</p>
            <p title="Player damage per turn, Player instance damage percentage">
                ({damagePerTurn}, {damagePercentage}%)
            </p>
        </div>
    );
};

export default DamageNumbers;
