import React, { useState } from "react";

// Component imports
import LoginWrapper from "../Components/LoginWrapper/LoginWrapper";
import DataNotification from "../Components/Notifications/DataNotification";

const Login = () => {
    // return <h1>Login</h1>;
    // if (Object.keys(userAuthenticated).length === 0) {

    // Notification message state
    const [dataNotifications, setDataNotifications] = useState([]);

    return (
        <>
            <LoginWrapper
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
            {dataNotifications.length !== 0
                ? dataNotifications.map((notification, index) => {
                      return (
                          <DataNotification
                              dataNotifications={dataNotifications}
                              setDataNotifications={setDataNotifications}
                              notification={notification}
                              index={index}
                              key={`${notification.message} ${index}`}
                          />
                      );
                  })
                : null}
        </>
    );
    //     }
};

export default Login;
