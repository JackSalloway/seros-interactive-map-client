import React, { useState, useEffect } from "react";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DataNotification.css";

const DataNotification = (props) => {
    const { dataNotifications, setDataNotifications, notification, index } =
        props;
    const [timerWidth, setTimerWidth] = useState(20);

    useEffect(() => {
        if (
            notification.important === false &&
            index === dataNotifications.length - 1
        ) {
            if (timerWidth !== -4) {
                setTimeout(() => {
                    setTimerWidth(timerWidth - 4);
                    console.log(timerWidth);
                }, 1000);
            }
        }
    }, [index, notification, timerWidth, dataNotifications]);

    useEffect(() => {
        if (timerWidth <= -4) {
            console.log("test");
            const notificationsCopy = dataNotifications;
            notificationsCopy.pop();
            setDataNotifications([...notificationsCopy]);
        }
    }, [dataNotifications, setDataNotifications, timerWidth]);

    return (
        <div className="notification-box">
            <FontAwesomeIcon
                icon="times"
                className="notification-box-close-icon"
                onClick={() => {
                    setTimerWidth(-4);
                }}
            />
            <p
                className="notification-box-text"
                style={{ color: notification.important ? "red" : "white" }}
            >
                {he.decode(notification.message)}
            </p>
            <div
                className="notification-box-timer"
                style={{
                    backgroundColor: notification.important ? "red" : "blue",
                    width: `${timerWidth}rem`,
                }}
            />
        </div>
    );
};

export default DataNotification;
