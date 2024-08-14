import React, { useState, useEffect, SetStateAction } from "react";
import { Map, LatLng } from "leaflet";
import { Marker, Popup, Tooltip } from "react-leaflet";
import he from "he";

// Type imports
import type { Location } from "../../types";

// Style imports
import "./MapMarker.css";

interface MapMarkerProps {
    location: Location;
    mapRef: React.RefObject<Map>;
    setSelectedLocationId: React.Dispatch<SetStateAction<null | number>>;
    markerBeingEdited: null | number;
    setMarkerBeingEdited: React.Dispatch<SetStateAction<null | number>>;
    setEditLocationDetails: React.Dispatch<SetStateAction<any>>;
    editMarkerLatLng: LatLng;
    setEditMarkerLatLng: React.Dispatch<SetStateAction<LatLng>>;
    editMarkerType: null | string;
    setEditMarkerType: React.Dispatch<SetStateAction<null | string>>;
    setDeleteData: React.Dispatch<SetStateAction<any>>;
}

const MapMarker: React.FC<MapMarkerProps> = (props) => {
    const {
        location,
        mapRef,
        setSelectedLocationId,
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
    const locationBriefDesc = location.description
        ? he.decode(location.description.split(".")[0] + "...")
        : "This location has no description...";

    // Render markers for locations
    if (draggable === false) {
        return (
            <Marker
                position={[location.latlng.lat, location.latlng.lng]}
                key={location.id}
                riseOnHover={true}
                draggable={draggable}
            >
                <Popup>
                    <div className="popup-container">
                        <h2 className="popup-h2">{he.decode(location.name)}</h2>
                        <p>{locationBriefDesc}</p>
                        <div className="popup-button-wrapper">
                            <button
                                onClick={() => {
                                    setSelectedLocationId(location.id);
                                    if (
                                        location.marked === true &&
                                        mapRef.current
                                    ) {
                                        mapRef.current.closePopup();
                                    }
                                }}
                                disabled={
                                    markerBeingEdited === null ? false : true
                                }
                            >
                                Open notes!
                            </button>

                            <button
                                onClick={() => {
                                    setDraggable(true);
                                    setMarkerBeingEdited(location.id);
                                    setEditLocationDetails(location);
                                    setEditMarkerLatLng(location.latlng);
                                    setEditMarkerType(location.type);
                                    setSelectedLocationId(null); // Used to kick users out of currently rendered location notes, so EditLocation can render in its place
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

    // Draggable is true so render a marker component that allows the user to edit the location
    return (
        <Marker
            position={editMarkerLatLng}
            key={location.id}
            riseOnHover={true}
            draggable={draggable}
            eventHandlers={{
                dragend: (e) => {
                    const latlng = new LatLng(
                        e.target._latlng.lat,
                        e.target._latlng.lng
                    );
                    setEditMarkerLatLng(latlng);
                },
            }}
        >
            <Popup>
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
