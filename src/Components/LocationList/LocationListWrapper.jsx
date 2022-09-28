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
    } = props;

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
                setCreationMarkerType={setCreationMarkerType}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
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
