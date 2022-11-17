// Style imports
import "./LoginWrapper.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginWrapper = (props) => {
    const { setUserAuthenticated, dataNotifications, setDataNotifications } =
        props;

    // User login/register states
    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResMsg, setLoginResMes] = useState(null);

    // Content display states
    const [contentDisplayProgress, setContentDisplayProgress] = useState(0);

    const contentDisplay = [
        {
            subject_header: "Welcome to the Seros Project!",
            sub_header:
                "A Dungeons and Dragons interactive map and note tracker.",

            render_login: true,
        },
        {
            subject_header: "Create campaigns!",
            sub_header:
                "Create and manage your own campaigns for you and your friends to enjoy!",
        },
        {
            subject_header: "Make your mark!",
            sub_header: "Add locations to specific points on your map!",
        },
        {
            subject_header: "Remember every face!",
            sub_header:
                "Take note of each and every character you meet along the way!",
        },
        {
            subject_header: "Set your own goals!",
            sub_header:
                "Set goals in the form of quests to help track your adventure!",
        },
        // {
        //     subject_header: "Begin creating memories!",
        //     sub_header: "Start your journey by creating memories!",
        // },
    ];

    useEffect(() => {
        // Reset states when newUser state is switched
        if (newUser === true || newUser === false) {
            setUsername("");
            setEmail("");
            setPassword("");
        }
    }, [newUser]);

    // Login functions
    const userLogin = async (e) => {
        e.preventDefault(); // Adding this for now as I haven't set up the route yet, however this function will redirect the page depending on the response.

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
                    const errorIndex = notificationsCopy.findIndex(
                        (notification) =>
                            notification.message ===
                            "Session timed out, please login again."
                    );
                    notificationsCopy[errorIndex] = {
                        message: "Login successful!",
                        important: false,
                    };
                    setDataNotifications(notificationsCopy);
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    setLoginResMes(error.response.data);
                    return;
                }
                setLoginResMes("Oops, something went wrong.");
            });
        // if (
        //     result.data ===
        //     "Incorrect details provided. Ensure your details are correct."
        // ) {
        //     setLoginResMes(result.data);
        //     return;
        // }
        // if (result.status)
        //     // Set value to true
        //     setUserAuthenticated(result.data);
    };

    const renderLoginForm = () => {
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
                        <button
                            className="user-form-button"
                            id="sign-in-button"
                        >
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

    // Create new user functions
    const createUser = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            data: {
                username: username,
                email: email,
                password: password,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/register`,
        })
            .then((response) => {
                if (response.data === "User created! Please login!") {
                    setNewUser(false);
                    setLoginResMes(response.data);
                    return;
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

    const renderCreateUserForm = () => {
        return (
            <>
                <form onSubmit={createUser} className="user-form-inputs">
                    <fieldset>
                        <legend>Create an account!</legend>
                        <label htmlFor="login-name">
                            Username
                            <input
                                type="text"
                                id="login-name"
                                required
                                placeholder="username"
                                value={username}
                                onChange={({ target }) => {
                                    setUsername(target.value);
                                }}
                            />
                        </label>
                        <label htmlFor="login-email">
                            Email
                            <input
                                type="email"
                                id="login_email"
                                required
                                placeholder="email"
                                value={email}
                                onChange={({ target }) => {
                                    setEmail(target.value);
                                }}
                            />
                        </label>
                        <label htmlFor="login-password">
                            Password
                            <input
                                type="password"
                                id="login-password"
                                required
                                placeholder="password"
                                value={password}
                                onChange={({ target }) => {
                                    setPassword(target.value);
                                }}
                            />
                        </label>
                        <button
                            className="user-form-button"
                            id="create-account-button"
                        >
                            Create account!
                        </button>
                    </fieldset>
                </form>
                <button
                    className="user-form-button"
                    id="create-account-button"
                    onClick={() => {
                        setNewUser(false);
                        setLoginResMes(null);
                    }}
                >
                    Already have an account?
                </button>
            </>
        );
    };

    return (
        <div id="login-wrapper">
            <div id="video-background-wrapper">
                <video autoPlay muted loop id="map-pan-video">
                    <source src="videos/SerosMapPan.mp4" type="video/mp4" />
                </video>
            </div>
            {loginResMsg === null ? null : (
                <p className="login-response-message">{loginResMsg}</p>
            )}
            <div id="login-screen-wrapper">
                {/* Header wrapper */}
                <div id="login-screen-header-wrapper">
                    <h1
                        id="login-screen-header"
                        className="login-screen-text-center"
                    >
                        {contentDisplay[contentDisplayProgress].subject_header}
                    </h1>
                    <p className="login-screen-text-center">
                        {contentDisplay[contentDisplayProgress].sub_header}
                    </p>
                </div>

                {/* Content Wrapper */}
                <div id="login-screen-content-display-wrapper">
                    {contentDisplay[contentDisplayProgress].render_login ===
                    true
                        ? newUser === false
                            ? renderLoginForm()
                            : renderCreateUserForm()
                        : null}
                </div>

                {/* Scroll bar wrapper */}
                <div id="content-display-scroller-wrapper">
                    <div id="content-display-scroller-progress">
                        {contentDisplay.map((display, index) => {
                            return (
                                <div
                                    className="content-display-scroller-progress-bar"
                                    onClick={() => {
                                        setContentDisplayProgress(index);
                                    }}
                                    style={{
                                        backgroundColor:
                                            contentDisplayProgress === index
                                                ? "black"
                                                : "white",
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* Arrow wrappers */}
                {/* login-screen-arrow-wrapper#left-arrow */}
                <div className="login-screen-arrow-wrapper" id="left-arrow">
                    <FontAwesomeIcon
                        icon="chevron-left"
                        className="journal-fa-icon"
                        // onClick={() => {
                        //     setSelected(true);
                        // }}
                    />
                </div>
                <div className="login-screen-arrow-wrapper" id="right-arrow">
                    <FontAwesomeIcon
                        icon="chevron-right"
                        className="journal-fa-icon"
                        // onClick={() => {
                        //     setSelected(true);
                        // }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginWrapper;
