import React from "react";

const DataNotification = (props) => {
    const { notification } = props;
    return <div>{notification.message}</div>;
};

export default DataNotification;
