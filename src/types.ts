import { Map, LatLng } from "leaflet";

export interface ListItemType {
    id: number;
    name: string;
    description: string;
    latlng: LatLng;
    mapRef: React.RefObject<Map>;
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
    sublocations: [Sublocation];
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
