const HealingNumbers = (props) => {
    const { healingTotal, healingPerTurn, healingPercentage } = props;

    return (
        <div className="player-meter-bar-numbers">
            <p title="Total player healing">{healingTotal}</p>
            <p title="Player healing per turn, Player instance healing percentage">
                ({healingPerTurn}, {healingPercentage})
            </p>
        </div>
    );
};

export default HealingNumbers;
