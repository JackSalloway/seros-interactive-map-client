import React from "react";
import axios from "axios";

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
        loginResMsg,
        setLoginResMes,
        setNewUser,
    } = props;

    // Login function
    const userLogin = async (e) => {
        e.preventDefault();

        axios({
            method: "post",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/login`,
        })
            .then((response) => {
                if (response.status === 200) {
                    // response.data looks like:
                    // { username: STRING, privileged: BOOL}
                    console.log(response.data);
                    setUserAuthenticated(response.data);
                    const notificationsCopy = dataNotifications;
                    // const errorIndex = notificationsCopy.findIndex(
                    //     (notification) =>
                    //         notification.message ===
                    //         "Session timed out, please login again."
                    // );
                    notificationsCopy.push({
                        message: "Login successful!",
                        important: false,
                    });
                    setDataNotifications([...notificationsCopy]);
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    setLoginResMes(error.response.data);
                    return;
                }
                setLoginResMes("Oops, something went wrong.");
            });
    };

    return (
        <>
            <form onSubmit={userLogin} className="user-form-inputs">
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
                    setLoginResMes(null);
                }}
            >
                Don't have an account?
            </button>
        </>
    );
};

export default LoginUserForm;
