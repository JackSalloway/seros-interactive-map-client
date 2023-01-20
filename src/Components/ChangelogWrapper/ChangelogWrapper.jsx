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
        <div key={date}>
            {username} {operationType} {dataAffected}: {dataName} at{" "}
            {dayjs(date).format("DD/MM/YYYY HH:mm:ss")}
        </div>
    );
};

const ChangelogWrapper = (props) => {
    const { campaign, changelogData, setChangeLogData } = props;

    if (changelogData === null) {
        return <p>Loading changelog data...</p>;
    }

    return (
        <div>
            <h2>{campaign.name}</h2>
            <h3>changelog</h3>
            {changelogData.length === 0 ? (
                <h3>No changes yet</h3>
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
