import React from "react";
import dayjs from "dayjs";

// Style imports
import "./ChangelogWrapper.css";

const changelogDiv = (
    username,
    operationType,
    dataAffected,
    dataName,
    date
) => {
    return (
        <div className="changelog-div" key={date}>
            <div className="changelog-div-header">
                {username} {dayjs(date).format("DD/MM/YYYY")}
                {" at "}
                {dayjs(date).format("HH:mm:ss")}
            </div>
            <div className="changelog-div-content">
                {operationType} {dataAffected}: {dataName}
            </div>
        </div>
    );
};

const ChangelogWrapper = (props) => {
    const { campaign, changelogData, setChangeLogData } = props;

    if (changelogData === null) {
        return <p>Loading changelog data...</p>;
    }

    // if ()

    // Need to style the changes so they look presentable - thinking something like discord messages styling
    // Need to edit the backend so the changes are limited to a certain amount

    return (
        <div id="changelog-wrapper">
            <div id="changelog-wrapper-header">
                <h2>{campaign.name}</h2>
                <h3>changelog</h3>
            </div>
            {changelogData.length === 0 ? (
                <div id="changelog-empty">
                    <h3>No changes yet, make some to see them logged here.</h3>
                </div>
            ) : (
                changelogData.map((change) => {
                    return changelogDiv(
                        change.username,
                        change.operation_type,
                        change.data_affected,
                        change.data_name,
                        change.created_at
                    );
                })
            )}
        </div>
    );
};

export default ChangelogWrapper;
