import { LatLng } from "leaflet";

export interface ListItemType {
    id: number;
    name: string;
    description: string;
    coords: LatLng | AssociatedLocation[];
}

export interface Campaign {
    id: number;
    name: string;
    description: string;
    is_admin: number;
}

export interface Location {
    campaign: {
        id: number;
    };
    id: number;
    name: string;
    description: string;
    latlng: LatLng;
    sublocations: Sublocation[];
    marked: boolean;
    visited: boolean;
    type: string;
    updated_at: string;
}

export interface Sublocation {
    id: number;
    name: string;
    description: string;
}

export interface AssociatedLocation {
    id: number;
    name: string;
    latlng: LatLng;
}

export interface AssociatedQuest {
    id: number;
    name: string;
}

export interface Quest {
    campaign: {
        id: number;
    };
    id: number;
    name: string;
    description: string;
    completed: boolean;
    updated_at: string;
    associated_locations: AssociatedLocation[];
}

export interface NPC {
    campaign: {
        id: number;
    };
    id: number;
    name: string;
    description: string;
    race: string;
    disposition: string;
    status: string;
    updated_at: string;
    associated_locations: AssociatedLocation[];
    associated_quests: AssociatedQuest[];
}

export interface CombatInstance {
    campaign: {
        id: number;
    };
    id: number;
    name: string;
    description: string;
    location: AssociatedLocation;
    players: Player[];
    updated_at: string;
}

export interface Player {
    id: number;
    name: string;
    class: string;
    is_real: number;
    turns: Turn[];
}

export interface Turn {
    id: number;
    turn_number: number;
    damage: number;
    healing: number;
    updated_at: string;
}
