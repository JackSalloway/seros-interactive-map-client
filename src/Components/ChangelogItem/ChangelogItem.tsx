import React from "react";
import dayjs from "dayjs";
import he from "he";

// Style import
import "./ChangelogItem.css";

// Type imports
import type { Changelog } from "../../types";

interface ChangelogItemProps {
    item: Changelog;
}

const ChangelogItem: React.FC<ChangelogItemProps> = (props) => {
    const { item } = props;

    return (
        <div className="changelog-item-wrapper">
            <div className="changelog-item-header" role="changelog-item-header">
                {he.decode(item.user)}{" "}
                {dayjs(item.created_at).format("DD/MM/YYYY")}
                {" at "}
                {dayjs(item.created_at).format("HH:mm:ss")}
            </div>
            <div
                className="changelog-item-content"
                role="changelog-item-content"
            >
                {item.action} {item.data_affected}: {he.decode(item.data_name)}
            </div>
        </div>
    );
};

export default ChangelogItem;
