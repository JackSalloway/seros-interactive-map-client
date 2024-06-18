import { useState } from "react";

// Component imports
import FaChevronIcon from "../FaChevronIcon/FaChevronIcon";

// Style import
import "./ListItem.css";

// Type imports
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

    const [selected, setSelected] = useState<boolean>(false);

    const jumpToLocationButton = (
        <button
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
        <div className="item-wrapper">
            <div className="item-header">
                <h3>{name}</h3>
                <FaChevronIcon open={selected} toggleOpen={setSelected} />
            </div>
            {selected === true ? (
                <div className="item-content">
                    <p>{description}</p>
                    {jumpToLocationButton}
                </div>
            ) : null}
        </div>
    );
};

export default ListItem;
