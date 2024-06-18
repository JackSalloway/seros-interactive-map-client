import { useState } from "react";

// Component imports
import ListItem from "../ListItem/ListItem";
import FaChevronIcon from "../FaChevronIcon/FaChevronIcon";

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

    const [selected, setSelected] = useState<boolean>(false);

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
            <div className="list-content">
                {selected === true
                    ? list?.map((item) => {
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
                      })
                    : null}
            </div>
        </div>
    );
};

export default ListWrapper;
