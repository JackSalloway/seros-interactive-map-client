import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./ListSortIcon.css";

interface ListSortIconProps {
    iconName: IconProp;
    sortValue: string;
    sortBy: string;
    setSortBy: React.Dispatch<SetStateAction<string>>;
}

const ListSortIcon: React.FC<ListSortIconProps> = (props) => {
    const { iconName, sortValue, sortBy, setSortBy } = props;

    return (
        <div>
            <FontAwesomeIcon
                className={`list-sort-icon ${
                    sortValue === sortBy ? "list-sort-icon-selected" : null
                }`}
                icon={iconName}
                data-testid="list-sort-icon"
                onClick={() => {
                    setSortBy(sortValue);
                }}
            />
        </div>
    );
};

export default ListSortIcon;
