const DamageNumbers = (props) => {
    const { damageTotal, damagePerTurn, damagePercentage } = props;
    return (
        <div className="player-meter-bar-numbers">
            <p>{damageTotal}</p>
            <p>
                ({damagePerTurn}, {damagePercentage}%)
            </p>
        </div>
    );
};

export default DamageNumbers;
