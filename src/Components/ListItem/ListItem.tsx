import { useState } from "react";
import he from "he";

// Component imports
import FaChevronIcon from "../FaChevronIcon/FaChevronIcon";

// Style import
import "./ListItem.css";

// Type imports
import type { AssociatedLocation } from "../../types";
import { Map, LatLng } from "leaflet";

interface ListComponentProps {
    id: number;
    name: string;
    description: string;
    coords: LatLng | AssociatedLocation[];
    mapRef: React.RefObject<Map>;
}

const ListItem: React.FC<ListComponentProps> = (props) => {
    const { id, name, description, coords, mapRef } = props;

    const [selected, setSelected] = useState<boolean>(false);

    // Render a button to jump to a specific latitude and longitude
    const jumpToLocationButton = (coordinates: LatLng) => (
        <button
            onClick={() => {
                if (mapRef.current?.getZoom() === 5) {
                    mapRef.current.flyTo(coordinates);
                } else {
                    mapRef.current?.setView(coordinates, 5);
                }
            }}
        >
            Jump to location!
        </button>
    );

    // Return the first sentence from the description
    const briefDescription = he.decode(description.split(".")[0] + "...");

    const renderContent = () => {
        // Check if the list item has been selected - early return if not
        if (!selected) return null;

        // Check if the item has an array of associated locations - the only time an item won't have a list of associated locations is if the item is a location/combat instance
        if (Array.isArray(coords)) {
            return (
                <div className="item-content">
                    <p>{briefDescription}</p>
                    {coords.map((location) => {
                        return (
                            <div
                                className="associated-location-content"
                                key={location.id}
                            >
                                <p>{he.decode(location.name)}</p>
                                {jumpToLocationButton(location.latlng)}
                            </div>
                        );
                    })}
                </div>
            );
        }

        // Item is a location/combat instance
        return (
            <div className="item-content">
                <p>{briefDescription}</p>
                {jumpToLocationButton(coords)}
            </div>
        );
    };

    return (
        <div className="item-wrapper">
            <div className="item-header">
                <h3>{he.decode(name)}</h3>
                <FaChevronIcon open={selected} toggleOpen={setSelected} />
            </div>
            {renderContent()}
        </div>
    );
};

export default ListItem;
