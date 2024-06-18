import React, { useState, useEffect, useRef, SetStateAction } from "react";
import ReactDOM from "react-dom";

// Style imports
import "./Sidebar.css";

interface CampaignTypes {
    id: number;
    name: string;
    description: string;
    is_admin: number;
}

interface SidebarProps {
    campaign: CampaignTypes;
    sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { sidebarOpen, campaign } = props;
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={sidebarRef}
            className={`sidebar-wrapper ${
                sidebarOpen === true ? "sidebar-open" : "sidebar-closed"
            }`}
        ></div>
    );
};

export default Sidebar;
