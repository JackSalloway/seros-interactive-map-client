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

    // Filter list whenever user updates the search input field
    useEffect(() => {
        // Set filteredList to default value if search query is empty
        if (filterString === "") setFilteredList(list);

        setFilteredList(
            list.filter((item) =>
                item.name.toLowerCase().includes(filterString.toLowerCase())
            )
        );
    }, [list, filterString]);

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
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default ListWrapper;
