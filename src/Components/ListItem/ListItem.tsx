import React from "react";
import { Map, LatLng } from "leaflet";

interface ListComponentProps {
    id: number;
    name: string;
    description: string;
    latlng: LatLng;
    mapRef: React.RefObject<Map>;
}

const ListItem: React.FC<ListComponentProps> = (props) => {
    const { id, name, description, latlng, mapRef } = props;

    const jumpToLocationButton = (
        <button
            className="location-list-notes-location-lat-lng"
            onClick={() => {
                if (mapRef.current?.getZoom() === 5) {
                    mapRef.current.flyTo(latlng);
                } else {
                    mapRef.current?.setView(latlng, 5);
                }
            }}
        >
            Jump to location!
        </button>
    );

    return (
        <div className="list-item-wrapper">
            <h3>{name}</h3>
            <p>{description}</p>
            {jumpToLocationButton}
        </div>
    );
};

export default ListItem;
