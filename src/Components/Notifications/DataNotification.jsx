import React from "react";

const DataNotification = (props) => {
    const { messageObject } = props;
    return <div>{messageObject.message}</div>;
};

export default DataNotification;
