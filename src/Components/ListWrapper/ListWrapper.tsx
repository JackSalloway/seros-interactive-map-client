import { useState, useEffect } from "react";

// Component imports
import ListItem from "../ListItem/ListItem";
import FaChevronIcon from "../FaChevronIcon/FaChevronIcon";
import ListFilter from "../ListFilter/ListFilter";

// Style imports
import "./ListWrapper.css";

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

    const [selected, setSelected] = useState<boolean>(false); // State for opening/closing list
    const [filterString, setFilterString] = useState<string>(""); // State for filter by search query
    const [filteredList, setFilteredList] = useState<ListItemType[]>([]); // State for filtering list
    const [sortBy, setSortBy] = useState<string>("alphabetical");

    // Function for sorting lists by alphabetical name value
    const orderAlphabetically = (array: ListItemType[]) => {
        return array.sort((a, b) => {
            let itemA = a.name.toUpperCase();
            let itemB = b.name.toUpperCase();
            return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
        });
    };

    // Function for sorting lists by date
    const orderChronologically = (array: ListItemType[]) => {
        return array.sort((a: ListItemType, b: ListItemType) => {
            let dateA = new Date(a.updated_at);
            let dateB = new Date(b.updated_at);
            return dateA.getTime() - dateB.getTime();
        });
    };

    // Filter list whenever user updates the search input field and sort by relevant value
    useEffect(() => {
        // Filter list by filter box input
        const filtered = list.filter((item) =>
            item.name.toLowerCase().includes(filterString.toLowerCase())
        );

        // Sort by relevant value
        switch (sortBy) {
            case "alphabetical":
                setFilteredList(orderAlphabetically(filtered));
                break;
            case "revAlphabetical":
                setFilteredList(orderAlphabetically(filtered).reverse());
                break;
            case "chronological":
                setFilteredList(orderChronologically(filtered));
                break;
            case "revChronological":
                setFilteredList(orderChronologically(filtered).reverse());
                break;
            default:
                setSortBy("alphabetical"); // Set sortBy state value to default value
        }
    }, [list, filterString, sortBy]);

    return (
        <div
            className={`list-wrapper ${
                selected ? "list-wrapper-open" : "list-wrapper-closed"
            }`}
        >
            <div className="list-header">
                <h3>{title}</h3>
                <FaChevronIcon open={selected} toggleOpen={setSelected} />
            </div>
            {selected === true ? (
                <div className="list-content">
                    <ListFilter setFilterString={setFilterString} />
                    {filteredList?.map((item) => {
                        return (
                            <ListItem
                                key={item.name + item.id}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                coords={item.coords}
                                mapRef={mapRef}
                                updated_at={item.updated_at}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default ListWrapper;
