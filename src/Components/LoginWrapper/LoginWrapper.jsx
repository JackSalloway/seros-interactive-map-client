import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Style imports
import "./LoginWrapper.css";

// Component imports
import LoginUserForm from "./LoginUserForm";
import CreateUserForm from "./CreateUserForm";

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
                    true ? (
                        newUser === false ? (
                            <LoginUserForm
                                username={username}
                                setUsername={setUsername}
                                password={password}
                                setPassword={setPassword}
                                setUserAuthenticated={setUserAuthenticated}
                                dataNotifications={dataNotifications}
                                setDataNotifications={setDataNotifications}
                                loginResMsg={loginResMsg}
                                setLoginResMes={setLoginResMes}
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
                            />
                        )
                    ) : null}
                </div>

                {/* Scroll bar wrapper */}
                <div id="content-display-scroller-wrapper">
                    <div id="content-display-scroller-progress">
                        {contentDisplay.map((subject, index) => {
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
                <div className="login-screen-arrow-wrapper" id="left-arrow">
                    <FontAwesomeIcon
                        icon="chevron-left"
                        className="journal-fa-icon"
                        onClick={() => {
                            if (contentDisplayProgress === 0) {
                                setContentDisplayProgress(4);
                                return;
                            }
                            setContentDisplayProgress(
                                contentDisplayProgress - 1
                            );
                        }}
                    />
                </div>
                <div className="login-screen-arrow-wrapper" id="right-arrow">
                    <FontAwesomeIcon
                        icon="chevron-right"
                        className="journal-fa-icon"
                        onClick={() => {
                            if (contentDisplayProgress === 4) {
                                setContentDisplayProgress(0);
                                return;
                            }
                            setContentDisplayProgress(
                                contentDisplayProgress + 1
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginWrapper;
