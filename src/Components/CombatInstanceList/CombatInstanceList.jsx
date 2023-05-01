import "./CombatInstanceList.css";

const CombatInstancesWrapper = (props) => {
    const { campaign, combatInstanceData } = props;

    return (
        <div className="combat-instance-wrapper">
            <div className="content-wrapper-header">
                <h2>{campaign.campaign.name}</h2>
                <h3>Combat Instances</h3>
            </div>
            <p>Combat instance logging coming soon!</p>
            {combatInstanceData.length === 0 ? (
                <p>
                    No combat instances found, head to a location and create one
                    to see them here!
                </p>
            ) : (
                <p>Combat instances found</p>
            )}
        </div>
    );
};

export default CombatInstancesWrapper;
