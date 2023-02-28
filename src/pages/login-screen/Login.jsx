// React imports
import { useState } from "react";

// Component imports
import LoginWrapper from "../../Components/LoginWrapper/LoginWrapper";
import DataNotification from "../../Components/Notifications/DataNotification";

const Login = () => {
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
