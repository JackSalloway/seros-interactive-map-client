import React from "react";
import "./LocationListWrapper.css";

const LocationListWrapper = (props) => {
    const {
        userAuthenticated,
        setRenderCreationMarker,
        creationMarkerLatLng,
        map,
    } = props;
    return (
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
};

export default LocationListWrapper;
