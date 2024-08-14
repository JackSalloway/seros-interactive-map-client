import React, { SetStateAction } from "react";
import { Map } from "leaflet";

// Component imports
import ListWrapper from "../ListWrapper/ListWrapper";
import ChangelogWrapper from "../ChangelogWrapper/ChangelogWrapper";
import JournalWrapper from "../JournalWrapper/JournalWrapper";

// Type imports
import type {
    Campaign,
    Location,
    Quest,
    NPC,
    CombatInstance,
    Changelog,
} from "../../types";

// Style imports
import "./Sidebar.css";

interface SidebarProps {
    campaign: Campaign;
    mapRef: React.RefObject<Map>;
    sidebarOpen: boolean;
    locations: Location[];
    setLocations: React.Dispatch<SetStateAction<Location[]>>;
    quests: Quest[];
    setQuests: React.Dispatch<SetStateAction<Quest[]>>;
    npcs: NPC[];
    setNPCs: React.Dispatch<SetStateAction<NPC[]>>;
    combatInstances: CombatInstance[];
    setCombatInstances: React.Dispatch<SetStateAction<CombatInstance[]>>;
    changelog: Changelog[];
    setSelectedLocationId: React.Dispatch<SetStateAction<null | number>>;
    selectedLocation: null | Location;
    selectedQuests: Quest[];
    selectedNPCs: NPC[];
    selectedCombatInstances: CombatInstance[];
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        campaign,
        mapRef,
        sidebarOpen,
        locations,
        setLocations,
        quests,
        setQuests,
        npcs,
        setNPCs,
        combatInstances,
        setCombatInstances,
        changelog,
        setSelectedLocationId,
        selectedLocation,
        selectedQuests,
        selectedNPCs,
        selectedCombatInstances,
    } = props;

    const sidebarContent = () => {
        if (!sidebarOpen) return null;

        // Sidebar is open but no location is selected - return lists
        if (selectedLocation === null)
            return (
                <>
                    <div id="sidebar-header">
                        <h2>{campaign.name}</h2>
                    </div>
                    <div id="sidebar-list-wrapper">
                        {/* Changelog List */}
                        <ChangelogWrapper
                            title={"Changelog"}
                            changelog={changelog}
                        />

                        {/* Location List */}
                        <ListWrapper
                            title={"Locations"}
                            mapRef={mapRef}
                            list={Array.from(
                                locations?.map((location) => {
                                    return {
                                        id: location.id,
                                        name: location.name,
                                        description: location.description,
                                        coords: location.latlng,
                                        updated_at: location.updated_at,
                                    };
                                })
                            )}
                            setSelectedLocationId={setSelectedLocationId}
                        />
                        {/* Quest List */}
                        <ListWrapper
                            title={"Quests"}
                            mapRef={mapRef}
                            list={Array.from(
                                quests?.map((quest) => {
                                    return {
                                        id: quest.id,
                                        name: quest.name,
                                        description: quest.description,
                                        coords: quest.associated_locations,
                                        updated_at: quest.updated_at,
                                    };
                                })
                            )}
                            setSelectedLocationId={setSelectedLocationId}
                        />
                        {/* NPC List */}
                        <ListWrapper
                            title={"NPCs"}
                            mapRef={mapRef}
                            list={Array.from(
                                npcs?.map((npc) => {
                                    return {
                                        id: npc.id,
                                        name: npc.name,
                                        description: npc.description,
                                        coords: npc.associated_locations,
                                        updated_at: npc.updated_at,
                                    };
                                })
                            )}
                            setSelectedLocationId={setSelectedLocationId}
                        />
                        {/* Combat Instance List */}
                        <ListWrapper
                            title={"Combat Instances"}
                            mapRef={mapRef}
                            list={Array.from(
                                combatInstances?.map((instance) => {
                                    return {
                                        id: instance.id,
                                        name: instance.name,
                                        description: instance.description,
                                        coords: instance.location.latlng,
                                        updated_at: instance.updated_at,
                                    };
                                })
                            )}
                            setSelectedLocationId={setSelectedLocationId}
                        />
                    </div>
                </>
            );
        // Sidebar is open and a location is selected - return location notes
        else
            return (
                <JournalWrapper
                    selectedLocation={selectedLocation}
                    setSelectedLocationId={setSelectedLocationId}
                    selectedNPCs={selectedNPCs}
                    selectedQuests={selectedQuests}
                    selectedInstances={selectedCombatInstances}
                    locations={locations}
                    npcs={npcs}
                    quests={quests}
                    instances={combatInstances}
                />
            );
    };

    return (
        <div
            role="sidebar-wrapper"
            className={`sidebar-wrapper ${
                sidebarOpen === true ? "sidebar-open" : "sidebar-closed"
            }`}
        >
            {sidebarContent()}
        </div>
    );
};

export default Sidebar;
