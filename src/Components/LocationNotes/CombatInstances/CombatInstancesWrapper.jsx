import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CombatInstancesWrapper = (props) => {
    const {
        showCombatInstances,
        setShowCombatInstances,
        locationNotes,
        locationCombatInstances,
    } = props;

    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(/images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
                <h3>Combat Instances</h3>
                {showCombatInstances === false ? (
                    <FontAwesomeIcon
                        icon="chevron-down"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowCombatInstances(!showCombatInstances);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon="chevron-up"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowCombatInstances(!showCombatInstances);
                        }}
                    />
                )}
            </div>
            {/* Has combat instances dropdown been clicked? */}
        </div>
    );
};

export default CombatInstancesWrapper;
