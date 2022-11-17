import React from "react";
import axios from "axios";

// Style imports
import "./UserFormStyles.css";

const CreateUserForm = (props) => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        setNewUser,
        loginResMsg,
        setLoginResMes,
    } = props;

    // Create new user function
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

    return (
        <>
            {loginResMsg === null ? null : (
                <p className="login-response-message">{loginResMsg}</p>
            )}
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

export default CreateUserForm;
