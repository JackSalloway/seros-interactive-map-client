import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import SubLocationNotes from "./SubLocationNotes";
import CreateSubLocation from "./CreateSubLocation";

const SubLocationWrapper = (props) => {
    const {
        showSubLocations,
        setShowSubLocations,
        locationNotes,
        setDeleteData,

        serosLocations,
        setSerosLocations,
        addNewSubLocation,
        setAddNewSubLocation,
        dataNotifications,
        setDataNotifications,
    } = props;

    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(./images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
                <div className="location-notes-category-wrapper-images-wrapper">
                    {/* <img
                        className="location-notes-category-wrapper-image"
                        src="images/ancient-columns.png"
                        alt="ancient ruins icon"
                    /> */}
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/village.png"
                        alt="village houses icon"
                    />
                </div>
                <h3>Sub Locations</h3>
                {showSubLocations === false ? (
                    <FontAwesomeIcon
                        // title="show-sub-locations-chevron" // This was an attempt to queryByTitle while unit testing.
                        icon="chevron-down"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowSubLocations(!showSubLocations);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon="chevron-up"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowSubLocations(!showSubLocations);
                        }}
                    />
                )}
                <div className="location-notes-category-wrapper-images-wrapper">
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/medieval-gate-1.png"
                        alt="medieval castle icon"
                    />
                    {/* <img
                        className="location-notes-category-wrapper-image"
                        src="images/wood-cabin.png"
                        alt="wood cabin icon"
                    /> */}
                </div>
            </div>
            {/* Has sub-locations drop down been clicked? */}
            {showSubLocations === true ? (
                // Are there more than 0 sub-locations?
                locationNotes.sub_locations.length > 0 ? (
                    <>
                        {locationNotes.sub_locations.map(
                            (subLocation, index) => (
                                <SubLocationNotes
                                    subLocation={subLocation}
                                    index={index}
                                    key={subLocation.name}
                                    locationNotes={locationNotes}
                                    setDeleteData={setDeleteData}
                                    serosLocations={serosLocations}
                                    setSerosLocations={setSerosLocations}
                                    dataNotifications={dataNotifications}
                                    setDataNotifications={setDataNotifications}
                                />
                            )
                        )}
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
                <CreateSubLocation
                    locationNotes={locationNotes}
                    serosLocations={serosLocations}
                    setSerosLocations={setSerosLocations}
                    setAddNewSubLocation={setAddNewSubLocation}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
            ) : null}
        </div>
    );
};

export default SubLocationWrapper;
