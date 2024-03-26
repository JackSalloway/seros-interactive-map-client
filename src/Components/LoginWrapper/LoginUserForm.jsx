// React Router imports
import { Form, useActionData } from "react-router-dom";

// React imports
import React, { useState, useEffect } from "react";

// Style imports
import "./UserFormStyles.css";

const LoginUserForm = (props) => {
    const { setNewUser } = props;

    const actionData = useActionData(); // Used to get the response from unsuccessful login attempts, causing a message to render informing the user

    const [loginMessage, setLoginMessage] = useState(null);

    // Couldnt manage to get this code to work in the same way other notifications work in my app.
    // The following code caused the notification to constantly add itself to the list after it was removed.
    // I believe it has something to do with the fact it relies on the actionData.
    // Will likely resolve this by changing the way the CreateUserForm component displays notifications to make it similar to how this one has to currently.

    // useEffect(() => {
    //     if (actionData) {
    //         if (actionData.isError && dataNotifications.length === 0) {
    //             const notificationsCopy = dataNotifications;
    //             notificationsCopy.push({
    //                 message: actionData.message,
    //                 important: true,
    //             });
    //             setDataNotifications([...notificationsCopy]);
    //             // setLoginMessage(actionData.message);
    //         }
    //     }
    // }, [actionData, dataNotifications, setDataNotifications]);

    useEffect(() => {
        if (actionData) {
            if (actionData.isError) {
                setLoginMessage(actionData.message);
            }
        }
    }, [actionData]);

    return (
        <div className="user-form-wrapper">
            {loginMessage !== null ? <p>{loginMessage}</p> : null}

            <Form
                method="post"
                action={"/"}
                className="user-form-inputs"
                id="user-form-inputs-login"
            >
                <label>
                    Username
                    <input
                        type="text"
                        id="login-username"
                        name="username"
                        required
                        placeholder={"Username"}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        required
                        placeholder={"Password"}
                    />
                </label>
                <button className="user-form-button" id="sign-in-button">
                    Sign in
                </button>
            </Form>

            <button
                className="user-form-button"
                id="no-account-button"
                onClick={() => {
                    setNewUser(true);
                }}
            >
                Don't have an account?
            </button>
        </div>
    );
};

export default LoginUserForm;
