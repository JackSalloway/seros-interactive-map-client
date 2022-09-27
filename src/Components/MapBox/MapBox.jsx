// Style imports
import "./MapBox.css";

// Component Imports
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MapMarker from "./MapMarker";

// Leaflet imports
import L, { LatLng, LatLngBounds } from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    LayersControl,
    LayerGroup,
    ZoomControl,
} from "react-leaflet";

// React imports
import React, { useState, useEffect } from "react";

function MapBox(props) {
    // Destructure props
    const {
        serosLocations,
        serosNPCs,
        serosQuests,
        map,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerLatLng,
        creationMarkerType,
        selectedLocationNotes,
        setSelectedLocationNotes,
        setSelectedLocationNPCs,
        setSelectedLocationQuests,
        userAuthenticated,
        markerBeingEdited,
        setMarkerBeingEdited,
        setEditLocationDetails,
        editMarkerLatLng,
        setEditMarkerLatLng,
        editMarkerType,
        setEditMarkerType,
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

    // Renders layer check boxes tied to each type of location, then calls the renderMarker function to render each relevant marker.
    var layerType = (type, locations) => {
        return (
            <LayersControl.Overlay name={type} checked key={type}>
                <LayerGroup>
                    {locations.reduce((matching, location, index) => {
                        if (location.type === type) {
                            return [
                                ...matching,
                                renderMarker(
                                    { ...location, originalIndex: index },
                                    index
                                ),
                            ];
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
            <MapMarker
                location={location}
                key={location._id}
                index={index}
                getIcon={getIcon}
                map={map}
                setSelectedLocationNotes={setSelectedLocationNotes}
                userAuthenticated={userAuthenticated}
                markerBeingEdited={markerBeingEdited}
                setMarkerBeingEdited={setMarkerBeingEdited}
                setEditLocationDetails={setEditLocationDetails}
                editMarkerLatLng={editMarkerLatLng}
                setEditMarkerLatLng={setEditMarkerLatLng}
                editMarkerType={editMarkerType}
                setEditMarkerType={setEditMarkerType}
            />
        );
    };

    // This function is used to give each marker an icon dependant on its type. Only issue is - I need to find/create images that match these types before I can implement is
    const getIcon = (iconType) => {
        // set icon anchor values dependant on icon height
        let iconHeight = 0;
        let iconWidth = 0;
        if (iconType === "city") {
            iconHeight = 40;
            iconWidth = 33;
        } else if (iconType === "fort") {
            iconHeight = 41;
            iconWidth = 26;
        } else if (iconType === "town") {
            iconHeight = 42;
            iconWidth = 31;
        } else if (iconType === "dungeon") {
            iconHeight = 43;
            iconWidth = 30;
        } else if (iconType === "natural_feature") {
            iconHeight = 35;
            iconWidth = 43;
        } else if (iconType === "miscellaneous") {
            iconHeight = 40;
            iconWidth = 20;
        } else {
            iconHeight = 41;
            iconWidth = 26;
        }

        return L.icon({
            iconUrl: require(`./icons/${iconType}.svg`),
            iconAnchor: L.point(iconWidth / 2, iconHeight),
            popupAnchor: L.point(0, iconHeight * -1),
            tooltipAnchor: L.point(iconWidth / 2, iconHeight * -0.65),
        });
    };

    // If data hasn't been fetched yet, don't render the map
    if (serosLocations === null) {
        return <LoadingScreen />;
    }

    // Create map boundries
    const swBoundry = new LatLng(-85, -200);
    const neBoundry = new LatLng(85, 200);
    const bounds = new LatLngBounds(swBoundry, neBoundry);

    // Events for animated panning when clicking a marker
    const MapEvents = () => {
        const map = useMapEvents({
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
    //         const centerLatLng = map.getCenter()
    //         map.setView(centerLatLng, 5)
    //         // setCreationMarkerLatLng([centerLatLng.lat, centerLatLng.lng])
    //     })
    // }

    // Function to render marker when button is clicked
    const renderDraggableMarker = () => {
        return (
            <Marker
                icon={getIcon(creationMarkerType)}
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
                    <p>Add your new location here!</p>
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
            // maxBoundsViscosity={0.3}
            ref={map}
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
