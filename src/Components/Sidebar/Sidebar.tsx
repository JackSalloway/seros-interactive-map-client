import React, { SetStateAction } from "react";
import { Map } from "leaflet";

// Component imports
import ListWrapper from "../ListWrapper/ListWrapper";

// Type imports
import type { Campaign, Location } from "../../types";

// Style imports
import "./Sidebar.css";

interface SidebarProps {
    campaign: Campaign;
    mapRef: React.RefObject<Map>;
    sidebarOpen: boolean;
    locations: Location[];
    setLocations: React.Dispatch<SetStateAction<Location[]>>;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { campaign, mapRef, sidebarOpen, locations, setLocations } = props;

    return (
        <div
            className={`sidebar-wrapper ${
                sidebarOpen === true ? "sidebar-open" : "sidebar-closed"
            }`}
        >
            <div id="sidebar-header-wrapper">
                <h2>{campaign.name}</h2>
            </div>
            <ListWrapper
                title={"Locations"}
                list={locations?.map((location) => {
                    return {
                        id: location.id,
                        name: location.name,
                        description: location.description,
                        latlng: location.latlng,
                        mapRef: mapRef,
                    };
                })}
            />
        </div>
    );
};

export default Sidebar;
