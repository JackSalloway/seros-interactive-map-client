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
        setCreationMarkerType,
        serosLocations,
        setSerosLocations,
        setLocationNotes,
        map,
        dataNotifications,
        setDataNotifications,
    } = props;

    // Create shallow copy variable for reuse
    const shallowCopy = Array.from(serosLocations).sort(function (a, b) {
        var locationA = a.name.toUpperCase();
        var locationB = b.name.toUpperCase();
        return locationA < locationB ? -1 : locationA > locationB ? 1 : 0;
    });

    const [locationList, setLocationList] = useState(shallowCopy);
    const [searchValue, setSearchValue] = useState("");

    // Filter the location list whenever the user edits the searchValue state
    useEffect(() => {
        if (searchValue === "") {
            setLocationList(shallowCopy);
            return;
        } else {
            setLocationList(
                shallowCopy.filter((location) =>
                    location.name
                        .toLowerCase()
                        .includes(searchValue.toLocaleLowerCase())
                )
            );
        }
    }, [shallowCopy, searchValue]);

    if (renderCreationMarker === true) {
        return (
            <LocationListCreateNewLocation
                map={map}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerType={setCreationMarkerType}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    }

    const createLocationWrapper = (
        <div id="create-location-wrapper">
            {userAuthenticated.privileged === true ? (
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
            ) : (
                <>
                    <h2>
                        You need to sign into a privileged account to create new
                        locations.
                    </h2>
                </>
            )}
            <h2>Or select a location to display notes!</h2>
        </div>
    );

    return (
        <div id="location-list-wrapper">
            {createLocationWrapper}
            <div id="location-list-wrapper-header">
                <input
                    type="text"
                    placeholder="Search for a location!"
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            </div>
            {locationList.map((location) => (
                <LocationListNotes
                    location={location}
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
