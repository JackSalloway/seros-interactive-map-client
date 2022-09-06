// Style imports
import "./LoginWrapper.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginWrapper = (props) => {
    const { setUserAuthenticated } = props;

    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResMsg, setLoginResMes] = useState(null);

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

        const result = await axios({
            method: "post",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "https://seros-interactive-map.herokuapp.com/login",
        });
        if (
            result.data ===
            "Incorrect details provided. Ensure your details are correct."
        ) {
            setLoginResMes(result.data);
            return;
        }
        if (result.status)
            // Set value to true
            setUserAuthenticated(result.data);
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
            url: "https://seros-interactive-map.herokuapp.com/register",
        }).then((response) => {
            // Sending a 401 or 409 status response crashed the app and stopped it from working, so unsure how to do this next part efficiently
            if (
                response.data ===
                "Username already exists. Please choose a different one."
            ) {
                setLoginResMes(response.data);
                return;
            }
            if (
                response.data ===
                "Email is already in use. Please use a different one."
            ) {
                setLoginResMes(response.data);
                return;
            }

            if (response.data === "User created! Please login!") {
                setNewUser(false);
                setLoginResMes(response.data);
                return;
            }
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
        <div id="homepage-banner">
            {loginResMsg === null ? null : (
                <p className="login-response-message">{loginResMsg}</p>
            )}
            {newUser === false ? renderLoginForm() : renderCreateUserForm()}
        </div>
    );
};

export default LoginWrapper;
