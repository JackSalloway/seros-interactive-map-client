import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import SublocationNotes from "./SublocationNotes";
import CreateSublocation from "./CreateSublocation";

const SublocationWrapper = (props) => {
    const {
        showSublocations,
        setShowSublocations,
        locationNotes,
        setDeleteData,
        locations,
        setLocations,
        addNewSubLocation,
        setAddNewSubLocation,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
    } = props;

    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(/images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
                <h3>Sublocations</h3>
                <span
                    data-testid="expand/collapse sub-locations icon"
                    onClick={() => {
                        setShowSublocations(!showSublocations);
                    }}
                >
                    {showSublocations === false ? (
                        <FontAwesomeIcon
                            icon="chevron-down"
                            className="location-notes-fa-icon h3"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon="chevron-up"
                            className="location-notes-fa-icon h3"
                        />
                    )}
                </span>
            </div>
            {/* Has sub-locations drop down been clicked? */}
            {showSublocations === true ? (
                // Are there more than 0 sub-locations?
                locationNotes.sublocations.length > 0 ? (
                    <>
                        {locationNotes.sublocations.map(
                            (sublocation, index) => (
                                <SublocationNotes
                                    sublocation={sublocation}
                                    index={index}
                                    key={sublocation.id}
                                    locationNotes={locationNotes}
                                    setDeleteData={setDeleteData}
                                    locations={locations}
                                    setLocations={setLocations}
                                    dataNotifications={dataNotifications}
                                    setDataNotifications={setDataNotifications}
                                    campaign={campaign}
                                    setChangelogData={setChangelogData}
                                    username={username}
                                />
                            )
                        )}
                        {/* Has add new sub-location been clicked? */}
                        <span
                            className="add-new-data"
                            id="add-new-sub-location"
                            data-testid="add new sub-location icon"
                            onClick={() => {
                                setAddNewSubLocation(!addNewSubLocation);
                            }}
                        >
                            {addNewSubLocation === false ? (
                                <FontAwesomeIcon
                                    icon="fa-plus"
                                    className="location-notes-fa-icon h3 location-notes-fa-plus"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon="fa-times"
                                    className="location-notes-fa-icon h3 location-notes-fa-cross"
                                />
                            )}
                        </span>
                    </>
                ) : (
                    <>
                        <p>There are no sub-locations here...</p>
                        {/* Has add new sub-location been clicked? */}
                        {addNewSubLocation === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                onClick={() => {
                                    setAddNewSubLocation(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                onClick={() => {
                                    setAddNewSubLocation(false);
                                }}
                            />
                        )}
                    </>
                )
            ) : null}
            {/* Has add new sub-location been clicked? */}
            {addNewSubLocation === true ? (
                <CreateSublocation
                    locationNotes={locationNotes}
                    locations={locations}
                    setLocations={setLocations}
                    setAddNewSubLocation={setAddNewSubLocation}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />
            ) : null}
        </div>
    );
};

export default SublocationWrapper;
