// Style imports
import "./MapBox.css";

// Leaflet imports
import { LatLng, LatLngBounds } from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMapEvents,
    LayersControl,
    LayerGroup,
    ZoomControl,
} from "react-leaflet";

// React imports
import React, { useState, useEffect } from "react";

import he from "he";

function MapBox(props) {
    // Destructure props
    const {
        serosLocations,
        serosNPCs,
        serosQuests,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerLatLng,
        setRenderLocationCreationForm,
        selectedLocationNotes,
        setSelectedLocationNotes,
        setSelectedLocationNPCs,
        setSelectedLocationQuests,
    } = props;

    // useState hooks
    // const [creationMarkerLatLng, setcreationMarkerLatLng] = useState([51.505, -0.09]);

    const [layerFilter, setLayerFilter] = useState([]);

    useEffect(() => {
        if (serosLocations === null) {
            return;
        }

        const filteredLocations = serosLocations
            .map((location) => location.type)
            .filter((location, index, arr) => {
                return arr.indexOf(location) === index;
            });

        setLayerFilter(filteredLocations);
    }, [setLayerFilter, serosLocations]);

    // Select relevant npcs when a location is selected
    useEffect(() => {
        if (selectedLocationNotes === null) {
            return;
        }
        // Filter through serosNPCs to find the NPCs relevant to the selected location.
        const reduceNPCs = serosNPCs.reduce((prevNPCs, npcData, index) => {
            if (
                npcData.associated_locations.findIndex(
                    (npcLocation) =>
                        npcLocation._id === selectedLocationNotes._id
                ) !== -1
            ) {
                return [...prevNPCs, { npcData, originalIndex: index }];
            }
            return prevNPCs;
        }, []);
        setSelectedLocationNPCs(reduceNPCs);
    }, [serosNPCs, selectedLocationNotes, setSelectedLocationNPCs]);

    // Select relevant quests when a location is selected
    useEffect(() => {
        if (selectedLocationNotes === null) {
            return;
        }
        // Filter through serosQuests to find the quests relevant to the selected location.
        const reduceQuests = serosQuests.reduce(
            (prevQuests, questData, index) => {
                if (
                    questData.associated_locations.findIndex(
                        (questLocation) =>
                            questLocation._id === selectedLocationNotes._id
                    ) !== -1
                ) {
                    return [...prevQuests, { questData, originalIndex: index }];
                }
                return prevQuests;
            },
            []
        );

        setSelectedLocationQuests(reduceQuests);
    }, [serosQuests, selectedLocationNotes, setSelectedLocationQuests]);

    // Capitalize first letter of each word
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(" ");
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    }

    // Renders layer check boxes tied to each type of location, then calls the renderMarker function to render each relevant marker.
    var layerType = (type, locations) => {
        return (
            <LayersControl.Overlay name={type} checked key={type}>
                <LayerGroup>
                    {locations.reduce((matching, location, index) => {
                        if (location.type === type) {
                            return [...matching, renderMarker(location, index)];
                        }

                        return matching;
                    }, [])}
                </LayerGroup>
            </LayersControl.Overlay>
        );
    };

    // Renders markers in using latlng coords and renders relevant information within a popup.
    var renderMarker = (location, index) => {
        return (
            <Marker
                position={[location.latlng.lat, location.latlng.lng]}
                key={location._id}
            >
                <Popup>
                    <div className="popup-container">
                        <h2 className="popup-h2">{he.decode(location.name)}</h2>
                        <h3 className="popup-h3">{titleCase(location.type)}</h3>
                        <button
                            onClick={() => {
                                setSelectedLocationNotes(index);
                            }}
                        >
                            Open notes!
                        </button>
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

    // If data hasn't been fetched yet, don't render the map
    if (serosLocations === null) {
        return <p>Loading...</p>;
    }

    // Create map boundries
    const swBoundry = new LatLng(-85, -180);
    const neBoundry = new LatLng(85, 180);
    const bounds = new LatLngBounds(swBoundry, neBoundry);

    // Events for animated panning when clicking a marker
    const MapEvents = () => {
        const map = useMapEvents({
            // There is a bug that stems from this event listener. When clicking a marker whilst the current zoom level === 5, if the marker is on either side of the map it hits the max bounds and stops trying to center the screen on the marker.
            // this can be fixed by increasing the map bounds, but I don't really want to do that - I wonder if there is a better way to do it.
            popupopen(e) {
                if (map.getZoom() === 5) {
                    map.flyTo(e.popup._latlng);
                } else {
                    map.setView(e.popup._latlng, 5);
                }
            },
        });
        return false;
    };

    // Tried to center the view when the creation marker was added, but there was a bug where the 'layeradd' event was clashing with the 'dragend' event
    // const CreationMarkerEvent = () => {
    //     const map = useMapEvent('layeradd', () => {
    //         // console.log(map.getCenter())
    //         const centerLatLng = map.getCenter()
    //         map.setView(centerLatLng, 5)
    //         // setCreationMarkerLatLng([centerLatLng.lat, centerLatLng.lng])
    //     })
    // }

    // Function to render marker when button is clicked
    const renderDraggableMarker = () => {
        return (
            <Marker
                position={creationMarkerLatLng}
                draggable={true}
                eventHandlers={{
                    dragend: (e) => {
                        setCreationMarkerLatLng([
                            e.target._latlng.lat,
                            e.target._latlng.lng,
                        ]);
                    },
                }}
            >
                {/* <CreationMarkerEvent /> */}
                <Popup>
                    <p>
                        Latitude: {creationMarkerLatLng[0]} <br /> Longitude:{" "}
                        {creationMarkerLatLng[1]}
                    </p>
                    <button
                        onClick={() => {
                            setRenderLocationCreationForm(true);
                        }}
                    >
                        Create a location here!
                    </button>
                </Popup>
            </Marker>
        );
    };

    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            minZoom={2}
            maxZoom={5}
            scrollWheelZoom={true}
            zoomControl={false}
            maxBounds={bounds}
        >
            <TileLayer
                url="../maps/seros/png-example/{z}/{x}/{y}.png"
                noWrap={true}
                bounds={bounds}
            />
            <ZoomControl position="bottomright" />
            <MapEvents />
            <LayersControl>
                {layerFilter.map((type) => layerType(type, serosLocations))}
            </LayersControl>
            {renderCreationMarker ? renderDraggableMarker() : null}
        </MapContainer>
    );
}

export default MapBox;
