// React imports
import React from "react";

import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

// Style imports
import "./UserFormStyles.css";

const LoginUserForm = (props) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        setUserAuthenticated,
        dataNotifications,
        setDataNotifications,
        setNewUser,
    } = props;

    // Login function
    const userLogin = async (e) => {
        e.preventDefault();

        const loginUserData = {
            username: username,
            password: password,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(loginUserData),
            mode: "cors",
            credentials: "include",
        };

        fetch(`${process.env.REACT_APP_API_URL}/login`, init)
            .then((response) => {
                if (response.status === 200) {
                    // response.data looks like:
                    // { username: STRING, privileged: BOOL}
                    setUserAuthenticated(response.data);
                    const notificationsCopy = dataNotifications;
                    notificationsCopy.push({
                        message: "Login successful!",
                        important: false,
                    });
                    setDataNotifications([...notificationsCopy]);
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    const notificationsCopy = dataNotifications;
                    notificationsCopy.push({
                        message: error.response.data,
                        important: true,
                    });
                    setDataNotifications([...notificationsCopy]);
                    return;
                }
            });
    };

    return (
        <div className="user-form-wrapper">
            <form
                onSubmit={userLogin}
                className="user-form-inputs"
                id="user-form-inputs-login"
            >
                <fieldset>
                    <legend>Login!</legend>
                    <label htmlFor="login-name">
                        Username
                        <input
                            type="text"
                            id="login-name"
                            required
                            value={username}
                            placeholder={"Username"}
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="login-password">
                        Password
                        <input
                            type="password"
                            id="login-password"
                            required
                            value={password}
                            placeholder={"Password"}
                            onChange={({ target }) => {
                                setPassword(target.value);
                            }}
                        />
                    </label>
                    <button className="user-form-button" id="sign-in-button">
                        Sign in
                    </button>
                </fieldset>
            </form>
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
