import React, { useState, useEffect, SetStateAction } from "react";
import { Map, LatLng, LatLngBounds } from "leaflet";
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

import { titleCase } from "../../imports/imports.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import MapMarker from "../MapMarker/MapMarker";

// Type imports
import type { Location, Quest, NPC, CombatInstance } from "../../types";

// Style imports
import "./MapWrapper.css";

interface MapWrapperProps {
    locations: Location[];
    npcs: NPC[];
    quests: Quest[];
    combatInstances: CombatInstance[];
    mapRef: React.RefObject<Map>;
    selectedLocationId: number;
    setSelectedLocationId: React.Dispatch<SetStateAction<null | number>>;
    setSelectedLocation: React.Dispatch<SetStateAction<Location>>;
    setSelectedLocationNPCs: React.Dispatch<SetStateAction<NPC[]>>;
    setSelectedLocationQuests: React.Dispatch<SetStateAction<Quest[]>>;
    setSelectedLocationCombatInstances: React.Dispatch<
        SetStateAction<CombatInstance[]>
    >;
    renderCreationMarker: boolean;
    creationMarkerLatLng: LatLng;
    setCreationMarkerLatLng: React.Dispatch<SetStateAction<LatLng>>;
    markerBeingEdited: null | number;
    setMarkerBeingEdited: React.Dispatch<SetStateAction<null | number>>;
    setEditLocationDetails: React.Dispatch<SetStateAction<any>>;
    editMarkerLatLng: LatLng;
    setEditMarkerLatLng: React.Dispatch<SetStateAction<LatLng>>;
    editMarkerType: null | string;
    setEditMarkerType: React.Dispatch<SetStateAction<null | string>>;
    setDeleteData: React.Dispatch<SetStateAction<any>>;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}

// interface SidebarProps {
//     campaign: Campaign;
//     mapRef: React.RefObject<Map>;
//     sidebarOpen: boolean;
//     locations: Location[];
//     setLocations: React.Dispatch<SetStateAction<Location[]>>;
//     quests: Quest[];
//     setQuests: React.Dispatch<SetStateAction<Quest[]>>;
//     npcs: NPC[];
//     setNPCs: React.Dispatch<SetStateAction<NPC[]>>;
//     combatInstances: CombatInstance[];
//     setCombatInstances: React.Dispatch<SetStateAction<CombatInstance[]>>;
//     changelog: Changelog[];
//     selectedLocation: Location;
//     selectedQuests: Quest[];
//     selectedNPCs: NPC[];
//     selectedCombatInstances: CombatInstance[];
// }

const MapWrapper: React.FC<MapWrapperProps> = (props) => {
    const {
        locations,
        quests,
        npcs,
        combatInstances,
        mapRef,
        selectedLocationId,
        setSelectedLocationId,
        setSelectedLocationNPCs,
        setSelectedLocationQuests,
        setSelectedLocationCombatInstances,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerLatLng,
        markerBeingEdited,
        setMarkerBeingEdited,
        setEditLocationDetails,
        editMarkerLatLng,
        setEditMarkerLatLng,
        editMarkerType,
        setEditMarkerType,
        setDeleteData,
        sidebarOpen,
        setSidebarOpen,
    } = props;

    const [layerFilter, setLayerFilter] = useState<string[]>([]);
    // useEffect to trigger map resize when journal component is opened/closed. Added a setTimeout as I put a transition on the sidebar
    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 401);
    }, [sidebarOpen]);

    // Update layerFilter array
    useEffect(() => {
        if (locations === null) {
            return;
        }

        const filteredLocations: string[] = locations
            .map((location) => location.type)
            .filter((location, index, arr) => {
                return arr.indexOf(location) === index;
            });

        setLayerFilter(filteredLocations);
    }, [setLayerFilter, locations]);

    // Select relevant npcs when a location is selected
    useEffect(() => {
        if (selectedLocationId === null) {
            return;
        }
        // Filter through serosNPCs to find the NPCs relevant to the selected location.
        const reduceNPCs = npcs.reduce<NPC[]>((prevNPCs, npcData) => {
            if (
                npcData.associated_locations.findIndex((npcLocation) => {
                    return npcLocation.id === selectedLocationId;
                }) !== -1
            ) {
                return [...prevNPCs, npcData];
            }
            return prevNPCs;
        }, []);
        setSelectedLocationNPCs(reduceNPCs);
    }, [npcs, selectedLocationId, setSelectedLocationNPCs]);

    // Select relevant quests when a location is selected
    useEffect(() => {
        if (selectedLocationId === null) {
            return;
        }
        // Filter through serosQuests to find the quests relevant to the selected location.
        const reduceQuests = quests.reduce<Quest[]>((prevQuests, questData) => {
            if (
                questData.associated_locations.findIndex(
                    (questLocation) => questLocation.id === selectedLocationId
                ) !== -1
            ) {
                return [...prevQuests, questData];
            }
            return prevQuests;
        }, []);
        setSelectedLocationQuests(reduceQuests);
    }, [quests, selectedLocationId, setSelectedLocationQuests]);

    // Select relevant combat instances when a location is selected
    useEffect(() => {
        if (selectedLocationId === null) {
            return;
        }
        // Filter through combatInstances to find the combat instances relevant to the selected location.
        const reduceCombatInstances = combatInstances.reduce<CombatInstance[]>(
            (prevInstances, instanceData) => {
                if (
                    (instanceData.location.id === selectedLocationId) ===
                    true
                ) {
                    return [...prevInstances, instanceData];
                }
                return prevInstances;
            },
            []
        );
        setSelectedLocationCombatInstances(reduceCombatInstances);
    }, [
        combatInstances,
        selectedLocationId,
        setSelectedLocationCombatInstances,
    ]);

    // Renders layer check boxes tied to each type of location, then calls the renderMarker function to render each relevant marker.
    const layerType = (type: string, index: number, locations: Location[]) => {
        return (
            <LayersControl.Overlay
                name={titleCase(type).replace("_", " ")} // The replace method is used to remove the _ in the natural_feature location type
                checked
                key={index}
            >
                <LayerGroup>
                    {locations.reduce<any[]>((matching, location, index) => {
                        if (location.type === type) {
                            return [...matching, renderMarker({ ...location })];
                        }

                        return matching;
                    }, [])}
                </LayerGroup>
            </LayersControl.Overlay>
        );
    };

    // Create map boundries
    const swBoundry = new LatLng(-400, -400);
    const neBoundry = new LatLng(400, 400);
    const bounds = new LatLngBounds(swBoundry, neBoundry);

    // Events for animated panning when clicking a marker
    const MapEvents = () => {
        const map = useMapEvents({
            popupopen(e) {
                const latlng = e.popup.getLatLng() as LatLng;

                if (map.getZoom() === 5) {
                    map.flyTo(latlng);
                } else {
                    map.setView(latlng, 5);
                }
            },
            resize(_e) {
                map.invalidateSize();
            },
        });
        return false;
    };

    // Create FontAwesome close/open sidebar icon
    const toggleSidebarIcon = () => {
        return (
            <>
                <FontAwesomeIcon
                    className={`toggle-sidebar-icon`}
                    icon={sidebarOpen === true ? "book" : "book-open"}
                    title={
                        sidebarOpen === true
                            ? "Close sidebar."
                            : "Open sidebar."
                    }
                    onClick={() => {
                        setSidebarOpen(!sidebarOpen);
                    }}
                />
                {/* <Tooltip place="left" type="dark" effect="float" /> */}
            </>
        );
    };

    const renderMarker = (location: Location) => {
        return (
            <MapMarker
                location={location}
                key={location.id}
                mapRef={mapRef}
                setSelectedLocationId={setSelectedLocationId}
                markerBeingEdited={markerBeingEdited}
                setMarkerBeingEdited={setMarkerBeingEdited}
                setEditLocationDetails={setEditLocationDetails}
                editMarkerLatLng={editMarkerLatLng}
                setEditMarkerLatLng={setEditMarkerLatLng}
                editMarkerType={editMarkerType}
                setEditMarkerType={setEditMarkerType}
                setDeleteData={setDeleteData}
            />
        );
    };

    // Function to render marker when button is clicked
    const renderDraggableMarker = () => {
        return (
            <Marker
                position={creationMarkerLatLng}
                draggable={true}
                eventHandlers={{
                    dragend: (e) => {
                        const latlng = new LatLng(
                            e.popup._latlng.lat,
                            e.popup._latlng.lng
                        );

                        setCreationMarkerLatLng(latlng);
                    },
                }}
            >
                {/* <CreationMarkerEvent /> */}
                <Popup>
                    <div className="popup-container">
                        <p>Add your new location here!</p>
                        <p>
                            Drag and drop this marker to change its position on
                            the map!
                        </p>
                    </div>
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
            ref={mapRef}
        >
            <TileLayer
                url="../maps/seros/png-example/{z}/{x}/{y}.png"
                noWrap={true}
                bounds={bounds}
            />
            {toggleSidebarIcon()}
            <ZoomControl position="bottomright" />
            <MapEvents />
            <LayersControl>
                {layerFilter.map((type, index) =>
                    layerType(type, index, locations)
                )}
            </LayersControl>
            {renderCreationMarker ? renderDraggableMarker() : null}
        </MapContainer>
    );
};

export default MapWrapper;
