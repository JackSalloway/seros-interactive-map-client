import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import CombatInstanceNotes from "./CombatInstanceNotes";

const CombatInstancesWrapper = (props) => {
    const {
        showCombatInstances,
        setShowCombatInstances,
        addNewInstance,
        setAddNewInstance,
        locationNotes,
        locationCombatInstances,
        setDeleteData,
        campaign,
        setChangelogData,
        username,
    } = props;

    const toggleNewInstanceButton = () => {
        if (addNewInstance === false) {
            return (
                <FontAwesomeIcon
                    icon="fa-plus"
                    className="location-notes-fa-icon h3 location-notes-fa-plus"
                />
            );
        } else {
            return (
                <FontAwesomeIcon
                    icon="fa-times"
                    className="location-notes-fa-icon h3 location-notes-fa-cross"
                />
            );
        }
    };

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
                // Are there more than 0 Combat Instances at this location?
                locationCombatInstances.legnth > 0 ? (
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
                        {/* Has add new Combat Instance been clicked? */}
                        <span
                            className="add-new-data"
                            onClick={() => {
                                setAddNewInstance(!addNewInstance);
                            }}
                        >
                            {toggleNewInstanceButton()}
                        </span>
                    </>
                ) : (
                    <>
                        <p>There are no combat instances at this location...</p>
                        {/* Has add new Combat Instance been clicked? */}
                        <span
                            className="add-new-data"
                            onClick={() => {
                                setAddNewInstance(!addNewInstance);
                            }}
                        >
                            {toggleNewInstanceButton()}
                        </span>
                    </>
                )
            ) : null}
        </div>
    );
};

export default CombatInstancesWrapper;
