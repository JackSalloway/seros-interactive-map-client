import React, { useState, useEffect } from "react";
import "./LocationListWrapper.css";
import LocationListNotes from "./LocationListNotes";
import LocationListCreateNewLocation from "./LocationListCreateNewLocation";

const LocationListWrapper = (props) => {
    const {
        userAuthenticated,
        renderCreationMarker,
        setRenderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerLatLng,
        setCreationMarkerType,
        unfilteredSerosLocations, // This is the original version, used to set the actual journal notes to the relevant location
        serosLocations, // This is a new version of serosLocations - passed in via the props of the component to keep the sorted list persistent
        setSerosLocations,
        setLocationNotes,
        map,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
    } = props;

    // Create shallow copy variable for reuse
    serosLocations.sort(function (a, b) {
        var locationA = a.name.toUpperCase();
        var locationB = b.name.toUpperCase();
        return locationA < locationB ? -1 : locationA > locationB ? 1 : 0;
    });

    const [locationList, setLocationList] = useState(serosLocations);
    const [searchValue, setSearchValue] = useState("");

    // Filter the location list whenever the user edits the searchValue state
    useEffect(() => {
        if (searchValue === "") {
            setLocationList(serosLocations);
            return;
        } else {
            setLocationList(
                serosLocations.filter((location) =>
                    location.name
                        .toLowerCase()
                        .includes(searchValue.toLocaleLowerCase())
                )
            );
        }
    }, [serosLocations, searchValue]);

    if (renderCreationMarker === true) {
        return (
            <LocationListCreateNewLocation
                map={map}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerLatLng={setCreationMarkerLatLng}
                setCreationMarkerType={setCreationMarkerType}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
                campaign={campaign}
                userAuthenticated={userAuthenticated}
                setChangelogData={setChangelogData}
            />
        );
    }

    const createLocationWrapper = (
        <div id="create-location-wrapper">
            <>
                <h2>Click here to add a new location on the map!</h2>
                <button
                    onClick={() => {
                        setRenderCreationMarker(true);
                        if (map.current.getZoom() === 5) {
                            map.current.flyTo(creationMarkerLatLng);
                        } else {
                            map.current.setView(creationMarkerLatLng, 5);
                        }
                    }}
                >
                    Add a new location!
                </button>
            </>

            <h2>Or select a location to display notes!</h2>
        </div>
    );

    return (
        <div id="location-list-wrapper" className="journal-content-wrapper">
            <div
                id="location-list-wrapper-header"
                className="content-wrapper-header"
            >
                <h2>{campaign.campaign.name}</h2>
                <h3>Location List</h3>
                <input
                    type="text"
                    placeholder="Search for a location!"
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            </div>
            {createLocationWrapper}
            {locationList.map((location) => (
                <LocationListNotes
                    location={location}
                    unfilteredSerosLocations={unfilteredSerosLocations}
                    serosLocations={serosLocations}
                    setLocationNotes={setLocationNotes}
                    map={map}
                    key={location._id}
                />
            ))}
        </div>
    );
};

export default LocationListWrapper;
