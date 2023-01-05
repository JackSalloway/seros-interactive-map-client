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
        setLoginResMes,
        dataNotifications,
        setDataNotifications,
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
                    const notificationsCopy = dataNotifications;
                    notificationsCopy.push({
                        message: `User: ${username} created! Please login!`,
                        important: false,
                    });
                    setDataNotifications([...notificationsCopy]);
                    return;
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
                setLoginResMes("Oops, something went wrong.");
            });
    };

    return (
        <div className="user-form-wrapper">
            <form
                onSubmit={createUser}
                className="user-form-inputs"
                id="user-form-inputs-register"
            >
                <fieldset>
                    <legend>Create an account!</legend>
                    <label htmlFor="register-name">
                        Username
                        <input
                            type="text"
                            id="register-name"
                            required
                            minLength={3}
                            placeholder="username"
                            value={username}
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="register-email">
                        Email
                        <input
                            type="email"
                            id="register_email"
                            required
                            placeholder="email"
                            value={email}
                            onChange={({ target }) => {
                                setEmail(target.value);
                            }}
                        />
                    </label>
                    <label htmlFor="register-password">
                        Password
                        <input
                            type="password"
                            id="register-password"
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
        </div>
    );
};

export default CreateUserForm;
