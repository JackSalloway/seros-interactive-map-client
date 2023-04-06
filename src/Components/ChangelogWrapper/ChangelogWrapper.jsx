import React from "react";
import dayjs from "dayjs";
import he from "he";

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
                {he.decode(username)} {dayjs(date).format("DD/MM/YYYY")}
                {" at "}
                {dayjs(date).format("HH:mm:ss")}
            </div>
            <div className="changelog-div-content">
                {operationType} {dataAffected}: {he.decode(dataName)}
            </div>
        </div>
    );
};

const ChangelogWrapper = (props) => {
    const { campaign, changelogData } = props;

    if (changelogData === null) {
        return <p>Loading changelog data...</p>;
    }

    return (
        <div id="changelog-wrapper">
            <div className="content-wrapper-header">
                <h2>{campaign.campaign.name}</h2>
                <h3>Changelog</h3>
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
