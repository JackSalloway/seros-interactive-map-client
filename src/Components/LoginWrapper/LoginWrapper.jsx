import React, { useState, useEffect } from "react";

// Style imports
import "./LoginWrapper.css";

// Component imports
import LoginUserForm from "./LoginUserForm";
import CreateUserForm from "./CreateUserForm";

const LoginWrapper = (props) => {
    const { dataNotifications, setDataNotifications } = props;

    // User login/register states
    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResMsg, setLoginResMes] = useState(null);

    // Reset states when newUser state is switched
    useEffect(() => {
        if (newUser === true || newUser === false) {
            setUsername("");
            setEmail("");
            setPassword("");
        }
    }, [newUser]);

    // Would like to remove the state props from the CreateUserForm component and make it like the LoginUserForm component to make this section more consistent.
    // To do this I would need to remove all the relevant state from this file and add it into the CreateUserForm so it can be handled there.
    // I would also need to change how the CreateUserForm component handles notifications -
    // One way of doing that would be to add a state value to this file that updates depending what the user does.

    return (
        <div id="login-wrapper">
            <div id="video-background-wrapper">
                <video autoPlay muted loop id="map-pan-video">
                    <source src="videos/SerosMapPan.mp4" type="video/mp4" />
                </video>
            </div>
            <div id="login-screen-wrapper">
                {/* Header wrapper */}
                <div id="login-screen-header-wrapper">
                    <h1>Tactical Journal</h1>
                </div>

                {/* Subheader wrapper */}
                <div id="login-screen-subheader-wrapper">
                    <h2 id="login-screen-subheader">Remember every step.</h2>
                    <h3 id="login-screen-subheader-text">
                        A dungeons and dragons interactive map and note tracker
                        companion app.
                    </h3>
                </div>

                {/* Content Wrapper */}
                <div id="login-screen-content-display-wrapper">
                    {newUser === false ? (
                        <LoginUserForm
                            // username={username}
                            // setUsername={setUsername}
                            // password={password}
                            // setPassword={setPassword}
                            // dataNotifications={dataNotifications}
                            // setDataNotifications={setDataNotifications}
                            // loginResMsg={loginResMsg}
                            // setLoginResMes={setLoginResMes}
                            setNewUser={setNewUser}
                        />
                    ) : (
                        <CreateUserForm
                            username={username}
                            setUsername={setUsername}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            setNewUser={setNewUser}
                            loginResMsg={loginResMsg}
                            setLoginResMes={setLoginResMes}
                            dataNotifications={dataNotifications}
                            setDataNotifications={setDataNotifications}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginWrapper;
