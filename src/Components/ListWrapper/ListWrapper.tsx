// Component imports
import ListItem from "../ListItem/ListItem";

// Type imports
import type { ListItemType } from "../../types";
import { Map } from "leaflet";

interface ListWrapperProps {
    title: string;
    list: ListItemType[];
    mapRef: React.RefObject<Map>;
}

const ListWrapper: React.FC<ListWrapperProps> = (props) => {
    const { title, list, mapRef } = props;

    return (
        <div>
            <h3>{title}</h3>
            {list?.map((item) => {
                return (
                    <ListItem
                        key={item.name + item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        latlng={item.latlng}
                        mapRef={mapRef}
                    />
                );
            })}
        </div>
    );
};

export default ListWrapper;

// interface SidebarProps {
//     campaign: Campaign;
//     mapRef: React.RefObject<Map>;
//     sidebarOpen: boolean;
//     locations: [Location];
//     setLocations: React.Dispatch<SetStateAction<Location[]>>;
// }

// const Sidebar: React.FC<SidebarProps> = (props) => {
//     const { campaign, mapRef, sidebarOpen, locations, setLocations } = props;
