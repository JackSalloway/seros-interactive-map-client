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
        markerBeingEdited,
        setMarkerBeingEdited,
        setEditLocationDetails,
        editMarkerLatLng,
        setEditMarkerLatLng,
        editMarkerType,
        setEditMarkerType,
        setDeleteData,
    } = props;

    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
        if (markerBeingEdited === null) {
            setDraggable(false);
        }
    }, [markerBeingEdited]);

    // Take first sentence from location description
    const locationBriefDesc = location.desc
        ? he.decode(location.desc.split(".")[0] + "...")
        : "This location has no description...";

    if (draggable === false) {
        return (
            <Marker
                position={[location.latlng.lat, location.latlng.lng]}
                key={location._id}
                // icon={getIcon(location.type)}
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
                        <p>{locationBriefDesc}</p>
                        <div className="popup-button-wrapper">
                            <button
                                onClick={() => {
                                    setSelectedLocationNotes(index);
                                    if (location.marked === true) {
                                        map.current.closePopup();
                                    }
                                }}
                                disabled={markerBeingEdited}
                            >
                                Open notes!
                            </button>

                            <button
                                onClick={() => {
                                    setDraggable(true);
                                    setMarkerBeingEdited(index);
                                    setEditLocationDetails(location);
                                    setEditMarkerLatLng(location.latlng);
                                    setEditMarkerType(location.type);
                                    setSelectedLocationNotes(null); // Used to kick users out of currently rendered location notes, so EditLocation can render in its place
                                }}
                                disabled={
                                    markerBeingEdited === null ? false : true
                                }
                            >
                                {markerBeingEdited === null
                                    ? "Edit Location!"
                                    : "Editing other location"}
                            </button>
                            <button onClick={() => setDeleteData(location)}>
                                Delete Location
                            </button>
                        </div>
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
    return (
        <Marker
            position={editMarkerLatLng}
            key={location._id}
            icon={getIcon(editMarkerType)}
            riseOnHover={true}
            draggable={draggable}
            eventHandlers={{
                dragend: (e) => {
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
                    <p>Drag and drop the marker to move the location!</p>
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
