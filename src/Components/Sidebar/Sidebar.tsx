import React, { SetStateAction } from "react";
import { Map } from "leaflet";

// Component imports
import ListWrapper from "../ListWrapper/ListWrapper";

// Type imports
import type {
    Campaign,
    Location,
    Quest,
    NPC,
    CombatInstance,
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
    } = props;

    const sidebarContent = () => {
        if (!sidebarOpen) return null;
        return (
            <>
                <div id="sidebar-header">
                    <h2>{campaign.name}</h2>
                </div>
                {/* Location List */}
                <div id="sidebar-list-wrapper">
                    <ListWrapper
                        title={"Locations"}
                        mapRef={mapRef}
                        list={locations?.map((location) => {
                            return {
                                id: location.id,
                                name: location.name,
                                description: location.description,
                                coords: location.latlng,
                            };
                        })}
                    />
                    {/* Quest List */}
                    <ListWrapper
                        title={"Quests"}
                        mapRef={mapRef}
                        list={quests?.map((quest) => {
                            return {
                                id: quest.id,
                                name: quest.name,
                                description: quest.description,
                                coords: quest.associated_locations,
                            };
                        })}
                    />
                    {/* NPC List */}
                    <ListWrapper
                        title={"NPCs"}
                        mapRef={mapRef}
                        list={npcs?.map((npc) => {
                            return {
                                id: npc.id,
                                name: npc.name,
                                description: npc.description,
                                coords: npc.associated_locations,
                            };
                        })}
                    />
                    {/* Combat Instance List */}
                    <ListWrapper
                        title={"Combat Instances"}
                        mapRef={mapRef}
                        list={combatInstances?.map((instance) => {
                            return {
                                id: instance.id,
                                name: instance.name,
                                description: instance.description,
                                coords: instance.location.latlng,
                            };
                        })}
                    />
                </div>
            </>
        );
    };

    return (
        <div
            className={`sidebar-wrapper ${
                sidebarOpen === true ? "sidebar-open" : "sidebar-closed"
            }`}
        >
            {sidebarContent()}
        </div>
    );
};

export default Sidebar;
