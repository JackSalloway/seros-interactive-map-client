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
            url: "login",
        });
        // Set value to true
        if (result.status) setUserAuthenticated(result.data);
    };

    const renderLoginForm = () => {
        return (
            <>
                <h2>Login!</h2>
                <p>
                    For full read/write access, please sign in to your account.
                </p>
                <form onSubmit={userLogin} className="user-form-inputs">
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
                    <button>Sign in</button>
                </form>
                <button
                    onClick={() => {
                        setNewUser(true);
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
            url: "register",
        });

        // const userData = {
        //     username: username,
        //     email: email,
        //     password: password,
        // }

        // const init = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData),
        //     mode: 'cors',
        //     // cache: 'default',
        //   };

        // fetch('register', init);
    };

    const renderCreateUserForm = () => {
        return (
            <>
                <h2>Create an account!</h2>
                <p>Create a new account for full read/write access!</p>
                <form onSubmit={createUser} className="user-form-inputs">
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
                    <button>Create account!</button>
                </form>
                <button
                    onClick={() => {
                        setNewUser(false);
                    }}
                >
                    Already have an account?
                </button>
            </>
        );
    };

    return (
        <div id="homepage-banner">
            {newUser === false ? renderLoginForm() : renderCreateUserForm()}
            {/* <Link to={'/login'}>Login!</Link> */}
            <br />
            <p>Or continue as a guest for read only access.</p>
            {/* <Link to={"/interactive-map"}>Continue as a guest!</Link> */}
        </div>
    );
};

export default LoginWrapper;
