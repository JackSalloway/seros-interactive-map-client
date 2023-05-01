import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import CombatInstanceNotes from "./CombatInstanceNotes";

const CombatInstancesWrapper = (props) => {
    const {
        showCombatInstances,
        setShowCombatInstances,
        locationNotes,
        locationCombatInstances,
        setDeleteData,
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
            {showCombatInstances === true ? (
                <>
                    {locationCombatInstances.map((instance) => {
                        return (
                            <CombatInstanceNotes
                                key={instance.instanceData.created_at}
                                instance={instance.instanceData}
                                setDeleteData={setDeleteData}
                            />
                        );
                    })}
                </>
            ) : null}
        </div>
    );
};

export default CombatInstancesWrapper;
