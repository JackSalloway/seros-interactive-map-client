import "./CombatInstanceWrapper.css";

const CombatInstancesWrapper = ({ campaign }) => {
    return (
        <div className="combat-instance-wrapper">
            <div className="content-wrapper-header">
                <h2>{campaign.campaign.name}</h2>
                <h3>Combat Instances</h3>
            </div>
            <p>Combat instance logging coming soon!</p>
        </div>
    );
};

export default CombatInstancesWrapper;
