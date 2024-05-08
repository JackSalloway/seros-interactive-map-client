import React, { useState } from "react";
import "../LocationList/LocationListCreateNewLocation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import he from "he";
import {
    CONTENT_TYPE_APPLICATION_JSON,
    customStyles,
    titleCase,
} from "../../imports/imports";

const EditLocation = (props) => {
    const {
        markerBeingEdited,
        setMarkerBeingEdited,
        editLocationDetails,
        editMarkerLatLng,
        setEditMarkerType,
        map,
        locations,
        setLocations,
        dataNotifications,
        setDataNotifications,
        campaign,
        userAuthenticated,
        changelog,
        setChangelog,
    } = props;

    const [showGuide, setShowGuide] = useState(false);

    // Create location state values
    const [locationName, setLocationName] = useState(
        he.decode(editLocationDetails.name)
    );
    const [locationDescription, setLocationDescription] = useState(
        editLocationDetails.desc ? he.decode(editLocationDetails.desc) : ""
    );
    const [locationRegion, setLocationRegion] = useState({
        value: editLocationDetails.region,
        label: editLocationDetails.region,
    });
    const [locationType, setLocationType] = useState({
        value: editLocationDetails.type,
        label: titleCase(editLocationDetails.type).replace("_", " "),
    });
    const [locationMarked, setLocationMarked] = useState(
        editLocationDetails.marked
    );
    const [locationVisited, setLocationVisited] = useState(
        editLocationDetails.visited
    );

    // Create post request
    const postData = async (e) => {
        e.preventDefault();

        const locationData = {
            location_lat: editMarkerLatLng[0] // This is assigned as a ternary as editMarkerLatLng doesn't set itself until the marker is dragged for the first time
                ? editMarkerLatLng[0]
                : editLocationDetails.latlng.lat,
            location_lng: editMarkerLatLng[1] // This is assigned as a ternary as editMarkerLatLng doesn't set itself until the marker is dragged for the first time
                ? editMarkerLatLng[1]
                : editLocationDetails.latlng.lng,
            location_name: locationName,
            location_desc: locationDescription,
            location_region: locationRegion.value,
            location_type: locationType.value,
            location_marked: locationMarked,
            location_visited: locationVisited,
            location_sub_locations: editLocationDetails.sub_locations,
            location_campaign_id: campaign.campaign._id,
            location_id: editLocationDetails._id,
            username: userAuthenticated.username,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(locationData),
            mode: "cors",
            credentials: "include",
        };

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/update_location`,
            init
        );
        const returnedData = await result.json();
        let locationsCopy = [...locations];
        locationsCopy[markerBeingEdited] = returnedData.locationResult;
        setLocations(locationsCopy);

        // Add notification showing that a location had been updated
        const newNotification = {
            message: `Location: ${locationName}, successfully updated!`,
            important: false,
        };
        setDataNotifications([...dataNotifications, newNotification]);

        // Update changelog
        setChangelog([...changelog, returnedData.changelogResult.changes]);

        // Cleanup state values that cause edit location form to render
        setMarkerBeingEdited(null);
    };

    // Type selection box variables
    // Create location types values
    const locationTypeValues = [
        { value: "city", label: "City" },
        { value: "town", label: "Town" },
        { value: "fort", label: "Fort" },
        { value: "ruins", label: "Ruins" },
        { value: "natural_feature", label: "Natural Feature" },
        { value: "dungeon", label: "Dungeon" },
        { value: "miscellaneous", label: "Miscellaneous" },
    ];

    // Function to handle changes in the selection box
    const handleLocationTypeChange = (location) => {
        setLocationType({
            value: he.decode(location.value),
            label: he.decode(location.label),
        });
        setEditMarkerType(location.value);
    };

    // Region selection box variables
    // Create location region values
    const locationRegionValues = [
        { value: "Eastern Kae Empire", label: "Eastern Kae Empire" },
        { value: "The Elven Kingdoms", label: "The Elven Kingdoms" },
        { value: "The North", label: "The North" },
        { value: "Western Kae Empire", label: "Western Kae Empire" },
        { value: "Draconic Territories", label: "Draconic Territories" },
        { value: "The Plains of Maddening", label: "The Plains of Maddening" },
    ];

    // Function to handle changes in the selection box
    const handleLocationRegionChange = (location) => {
        setLocationRegion({
            value: he.decode(location.value),
            label: he.decode(location.label),
        });
    };

    const createSelectBox = (
        subject,
        subjectState,
        subjectValues,
        subjectOnChangeFunc
    ) => {
        return (
            <Select
                menuShouldBlockScroll={true} // This prevents scrolling within the journal component whilst a dropdown menu is open, which is needed due to the dropdown menu staying in a fixed position, rather than being relative to it's parent
                menuPlacement="auto" // This prevents the menu from increasing the page size if it is at the bottom of the journal component. It does this by placing the menu above the options box
                menuPortalTarget={document.body} // This is used to give the menu a z-index to prevent it being hidden by other elements
                options={subjectValues}
                value={subjectState}
                onChange={subjectOnChangeFunc}
                styles={customStyles}
                id={subject}
            />
        );
    };

    return (
        <div id="journal-create-new-location">
            <FontAwesomeIcon
                icon="fa-info-circle"
                id="journal-create-new-location-info-icon"
                className="tooltip-icon"
                onClick={() => {
                    setShowGuide(!showGuide);
                }}
            />
            <h2>Edit: {he.decode(editLocationDetails.name)}!</h2>
            <button
                onClick={() => {
                    if (map.current.getZoom() === 5) {
                        map.current.flyTo(editMarkerLatLng);
                    } else {
                        map.current.setView(editMarkerLatLng, 5);
                    }
                }}
            >
                Jump to marker!
            </button>
            <p>
                Latitude:{" "}
                {editMarkerLatLng[0]
                    ? editMarkerLatLng[0]
                    : editLocationDetails.latlng.lat}
            </p>
            <p>
                longitude:{" "}
                {editMarkerLatLng[1]
                    ? editMarkerLatLng[1]
                    : editLocationDetails.latlng.lng}
            </p>
            {showGuide === true ? (
                <div id="journal-create-new-location-guide-div">
                    <h3>Edit Location Guide</h3>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Name
                        </span>
                        : The name of your location.
                    </p>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Description
                        </span>
                        : The description of your location. Try to give a brief
                        description of your location in the first sentence, as
                        this will be used in the location list to describe the
                        location.
                    </p>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Region
                        </span>
                        : The region your location resides in.
                    </p>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Visited
                        </span>
                        : Whether or not you have visited the location in game
                        yet.
                    </p>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Marked
                        </span>
                        : Whether or not the location is marked on the map,
                        either by text or an image displayed on the map. If the
                        locaiton is not marked a tooltip will be added for it's
                        marker to see what location is which with ease.
                    </p>
                    <p>
                        <span className="journal-create-new-location-guide-bold-text">
                            Type
                        </span>
                        : The type category the location falls under. This will
                        decide what icon is used for the map marker.
                    </p>
                </div>
            ) : null}
            <form onSubmit={postData} id="journal-create-new-location-form">
                <div className="journal-create-new-location-input-div">
                    <label htmlFor="name">
                        Name:
                        <input
                            id="name"
                            type="string"
                            required
                            value={locationName}
                            onChange={({ target }) => {
                                setLocationName(target.value);
                            }}
                        />
                    </label>
                </div>
                <div className="journal-create-new-location-input-div">
                    <label htmlFor="desc">
                        Description:
                        <textarea
                            id="desc"
                            type="text"
                            required
                            value={locationDescription}
                            onChange={({ target }) => {
                                setLocationDescription(target.value);
                            }}
                        />
                    </label>
                </div>
                <div className="journal-create-new-location-input-div create-new-location-select-box">
                    <label htmlFor="location-type">
                        Type:
                        {createSelectBox(
                            "location-type",
                            locationType,
                            locationTypeValues,
                            handleLocationTypeChange
                        )}
                    </label>
                </div>
                <div className="journal-create-new-location-input-div create-new-location-select-box">
                    <label htmlFor="location-region">
                        Region:
                        {createSelectBox(
                            "location-region",
                            locationRegion,
                            locationRegionValues,
                            handleLocationRegionChange
                        )}
                    </label>
                </div>
                <div className="journal-create-new-location-visited-marked-wrapper">
                    <div>
                        <label htmlFor="visited">
                            Visited:
                            <input
                                id="visited"
                                type="checkbox"
                                defaultChecked={locationVisited}
                                onChange={() =>
                                    setLocationVisited(!locationVisited)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="marked">
                            marked:
                            <input
                                id="marked"
                                type="checkbox"
                                defaultChecked={locationMarked}
                                onChange={() =>
                                    setLocationMarked(!locationMarked)
                                }
                            />
                        </label>
                    </div>
                </div>
                <div id="journal-create-new-location-submit-button-div">
                    <button>Submit update!</button>
                </div>
            </form>
            <button onClick={() => setMarkerBeingEdited(null)}>
                Cancel update
            </button>
        </div>
    );
};

export default EditLocation;
