const HealingNumbers = (props) => {
    const { healingTotal, healingPerTurn, healingPercentage } = props;

    console.log(healingPercentage);

    return (
        <div className="player-meter-bar-numbers">
            <p>{healingTotal}</p>
            <p>
                ({healingPerTurn}, {healingPercentage}%)
            </p>
        </div>
    );
};

export default HealingNumbers;
