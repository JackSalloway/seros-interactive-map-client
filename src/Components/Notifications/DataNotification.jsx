import React from "react";
import he from "he";

const DataNotification = (props) => {
    const { notification } = props;
    return (
        <div style={{ color: notification.important ? "red" : "white" }}>
            {he.decode(notification.message)}
        </div>
    );
};

export default DataNotification;
