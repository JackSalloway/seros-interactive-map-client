import React, { useState, useEffect } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import he from "he";

const MapMarker = (props) => {
    const {
        location,
        index,
        getIcon,
        map,
        setSelectedLocationNotes,
        userAuthenticated,
        markerBeingEdited,
        setMarkerBeingEdited,
        setEditLocationDetails,
        editMarkerLatLng,
        setEditMarkerLatLng,
        editMarkerType,
        setEditMarkerType,
    } = props;

    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
        if (markerBeingEdited === false) {
            setDraggable(false);
        }
    }, [markerBeingEdited]);

    if (draggable === false) {
        return (
            <Marker
                position={[location.latlng.lat, location.latlng.lng]}
                key={location._id}
                icon={getIcon(location.type)}
                riseOnHover={true}
                draggable={draggable}
            >
                <Popup
                // The following attribute can be used to move the position of the popup in relation to the marker icon
                // offset={L.point(21, 7)}
                >
                    <div className="popup-container">
                        <h2 className="popup-h2">{he.decode(location.name)}</h2>
                        {/* <h3 className="popup-h3">{titleCase(location.type)}</h3> */}
                        <button
                            onClick={() => {
                                setSelectedLocationNotes(index);
                                if (location.marked === true) {
                                    map.current.closePopup();
                                }
                            }}
                        >
                            Open notes!
                        </button>
                        {userAuthenticated.privileged === true ? (
                            <button
                                onClick={() => {
                                    setDraggable(true);
                                    setMarkerBeingEdited(true);
                                    setEditLocationDetails(location);
                                    setEditMarkerLatLng(location.latlng);
                                    setEditMarkerType(location.type);
                                }}
                                disabled={markerBeingEdited}
                            >
                                {markerBeingEdited === false
                                    ? "Edit Notes!"
                                    : "Editing other location"}
                            </button>
                        ) : null}
                    </div>
                </Popup>
                {/* If location does not have a marked image on the map, display its name as a tooltip */}
                {location.marked ? null : (
                    <Tooltip direction="center" offset={[-12.5, 45]}>
                        {he.decode(location.name)}
                    </Tooltip>
                )}
            </Marker>
        );
    }

    // console.log(editMarkerLatLng);
    return (
        <Marker
            position={editMarkerLatLng}
            key={location._id}
            icon={getIcon(editMarkerType)}
            riseOnHover={true}
            draggable={draggable}
            eventHandlers={{
                dragend: (e) => {
                    console.log(e.target._latlng);
                    setEditMarkerLatLng([
                        e.target._latlng.lat,
                        e.target._latlng.lng,
                    ]);
                },
            }}
        >
            <Popup
            // The following attribute can be used to move the position of the popup in relation to the marker icon
            // offset={L.point(21, 7)}
            >
                <div className="popup-container">
                    <h2 className="popup-h2">{he.decode(location.name)}</h2>
                    <p>Currently editing...</p>
                </div>
            </Popup>
            {/* If location does not have a marked image on the map, display its name as a tooltip */}
            {location.marked ? null : (
                <Tooltip direction="center" offset={[-12.5, 45]}>
                    {he.decode(location.name)}
                </Tooltip>
            )}
        </Marker>
    );
};

export default MapMarker;
