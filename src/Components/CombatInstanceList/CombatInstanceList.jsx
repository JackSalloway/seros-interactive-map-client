import "./CombatInstanceList.css";
import dayjs from "dayjs";

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
                combatInstanceData.map((instance) => {
                    return (
                        <div key={instance.created_at}>
                            <p>{instance.name}</p>
                            <p>
                                {dayjs(instance.created_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CombatInstancesWrapper;
