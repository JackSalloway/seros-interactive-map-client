import React, { SetStateAction } from "react";

// Style import
import "./ListFilter.css";

interface ListFilterProps {
    setFilterString: React.Dispatch<SetStateAction<string>>;
}

const ListFilter: React.FC<ListFilterProps> = (props) => {
    const { setFilterString } = props;

    return (
        <div className="list-filter-wrapper">
            <input
                type="text"
                className="list-filter-text-input"
                placeholder="Enter a search query to filter the list"
                onChange={(e) => {
                    setFilterString(e.target.value);
                }}
            />
        </div>
    );
};

export default ListFilter;
