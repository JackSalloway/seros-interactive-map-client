// React Router imports
import { Form, useActionData } from "react-router-dom";
import { useNavigate, redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

// Style imports
import "./UserFormStyles.css";

const LoginUserForm = (props) => {
    const navigate = useNavigate();

    const {
        username,
        setUsername,
        password,
        setPassword,
        dataNotifications,
        setDataNotifications,
        setNewUser,
    } = props;

    const actionData = useActionData();

    const [loginMessage, setLoginMessage] = useState(null);

    useEffect(() => {
        if (actionData) {
            if (actionData.isError) {
                setLoginMessage(actionData.message);
            }
        }
    }, [actionData]);

    // Login function taken from the attempt at making a react router action
    const userLogin = async ({ request }) => {
        const data = await request.formData();
        console.log(request);
        const loginUserData = {
            username: data.get("username"),
            password: data.get("password"),
        };
        console.log(loginUserData);

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(loginUserData),
            mode: "cors",
            credentials: "include",
        };

        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, init)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Response === 200");
                    return redirect("/dashboard");
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("error logging in");

                if (error.response.status === 400) {
                    console.log("error");
                    return null;
                }
                return null;
            });
        console.log(res);
    };

    // Action to log user in when they provide correct credentials
    // React Router Dom Form component can be found within LoginUserForm component

    // Old login post request - trying to use this one to recreate login functionality
    // const userLogin = async (e) => {
    //     e.preventDefault();
    //     // const data = await request.formData();
    //     // console.log(request);
    //     const loginUserData = {
    //         username: username,
    //         password: password,
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
    //                 console.log("Response === 200");
    //                 // response.data looks like:
    //                 // { username: STRING, privileged: BOOL}
    //                 // const notificationsCopy = dataNotifications;
    //                 // notificationsCopy.push({
    //                 //     message: "Login successful!",
    //                 //     important: false,
    //                 // });
    //                 // setDataNotifications([...notificationsCopy]);
    //                 return navigate("/dashboard");
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
    // };

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
            {/* <form
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
            </form> */}
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
