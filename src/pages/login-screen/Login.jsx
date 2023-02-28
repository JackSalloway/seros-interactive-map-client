// React imports
import { useState } from "react";
// React Router imports
import { redirect } from "react-router-dom";
// Component imports
import LoginWrapper from "../../Components/LoginWrapper/LoginWrapper";
import DataNotification from "../../Components/Notifications/DataNotification";

import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";
const Login = () => {
    // return <h1>Login</h1>;
    // if (Object.keys(userAuthenticated).length === 0) {

    // Notification message state
    const [dataNotifications, setDataNotifications] = useState([]);

    return (
        // <>login</>

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

// Action to log user in when they provide correct credentials
// React Router Dom Form component can be found within LoginUserForm component
// export const action = async ({ request }) => {
//     const data = await request.formData();
//     console.log(request);
//     const loginUserData = {
//         username: data.get("username"),
//         password: data.get("password"),
//     };
//     console.log(loginUserData);

//     const init = {
//         method: "POST",
//         headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
//         body: JSON.stringify(loginUserData),
//         mode: "cors",
//         credentials: "include",
//     };

//     const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, init)
//         .then((response) => {
//             if (response.status === 200) {
//                 // response.data looks like:
//                 // { username: STRING, privileged: BOOL}
//                 // const notificationsCopy = dataNotifications;
//                 // notificationsCopy.push({
//                 //     message: "Login successful!",
//                 //     important: false,
//                 // });
//                 // setDataNotifications([...notificationsCopy]);
//                 // return redirect("/dashboard");
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//             console.log("error logging in");

//             if (error.response.status === 400) {
//                 console.log("error");
//                 // const notificationsCopy = dataNotifications;
//                 // notificationsCopy.push({
//                 //     message: error.response.data,
//                 //     important: true,
//                 // });
//                 // setDataNotifications([...notificationsCopy]);
//                 return null;
//             }
//             return null;
//         });
//     console.log(res);

//     if (res.ok) {
//         return redirect("/dashboard");
//     } else {
//         return null;
//     }
// };

// THIS LOADER DOES NOT CURRENTLY SEEM TO WORK - IT DOES NOT PROVIDE ANY DATA TO THE NAVBAR USEMATCHES STATE VALUE

export default Login;
