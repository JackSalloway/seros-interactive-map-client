import { useState, SetStateAction } from "react";
import he from "he";
import dayjs from "dayjs";

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
    updated_at: string;
    setSelectedLocationId: React.Dispatch<SetStateAction<null | number>>;
}

const ListItem: React.FC<ListComponentProps> = (props) => {
    const {
        id,
        name,
        description,
        coords,
        mapRef,
        updated_at,
        setSelectedLocationId,
    } = props;

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
                setSelectedLocationId(id);
            }}
        >
            Jump to location!
        </button>
    );

    // Return the first sentence from the description
    const briefDescription = he.decode(description.split(".")[0] + "...");

    // Generate human readable date and time using the updated_at value
    const updatedAt = `Last updated: ${dayjs(updated_at).format(
        "DD/MM/YYYY"
    )} at ${dayjs(updated_at).format("HH:mm:ss")}`;

    const renderContent = () => {
        // Check if the list item has been selected - early return if not
        if (!selected) return null;

        // Check if the item has an array of associated locations - the only time an item won't have a list of associated locations is if the item is a location/combat instance
        if (Array.isArray(coords)) {
            return (
                <>
                    {" "}
                    <p role="item-content-description">{briefDescription}</p>
                    <p role="item-content-updated_at">{updatedAt}</p>
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
                </>
            );
        }

        // Item is a location/combat instance
        return (
            <>
                <p role="item-content-description">{briefDescription}</p>
                <p role="item-content-updated_at">{updatedAt}</p>
                {jumpToLocationButton(coords)}
            </>
        );
    };

    return (
        <div className="item-wrapper">
            <div className="item-header">
                <h3 role="item-header-name">{he.decode(name)}</h3>
                <FaChevronIcon open={selected} toggleOpen={setSelected} />
            </div>
            <div className="item-content">{renderContent()}</div>
        </div>
    );
};

export default ListItem;
