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
    const [leftArrowStyles, setLeftArrowStyles] = useState(0.2);
    const [rightArrowStyles, setRightArrowStyles] = useState(1);
    const [contentDisplayProgress, setContentDisplayProgress] = useState(0);

    // Reset states when newUser state is switched
    useEffect(() => {
        if (newUser === true || newUser === false) {
            setUsername("");
            setEmail("");
            setPassword("");
        }
    }, [newUser]);

    const contentDisplay = [
        {
            subject_header: "Welcome to the Seros Project!",
            sub_header:
                "A Dungeons and Dragons interactive map and note tracker.",
            render_login: true,
        },
        {
            subject_header: "Begin your adventure!",
            sub_header: "Create and manage your own campaigns!",
            subject_messages: [
                "Upload your own map. (NOT YET IMPLEMENTED)",
                "Name and describe your campaign.",
                "Invite your friends.",
                "Manage your campaign settings.",
            ],
            image: {
                src: "campaign",
                alt: "Tactical Journal App campaign dashboard screen.",
            },
        },
        {
            subject_header: "Make your mark!",
            sub_header: "Add locations to specific points on your map!",
            subject_messages: [
                "Add memorable or important locations.",
                "Name and describe your locations.",
                "Filter locations from an array of location types.",
                "Edit your locations values.",
            ],
            image: {
                src: "locations",
                alt: "Tactical Journal App, interactive map screen.",
            },
        },
        {
            subject_header: "Remember every face!",
            sub_header:
                "Take note of each and every character you meet along the way!",
            subject_messages: [
                "Log each character you meet, friend or foe.",
                "Name and describe your characters.",
                "Monitor characters statuses and dispositions.",
                "Edit your characters values.",
            ],
            image: {
                src: "npc",
                alt: "Tactical Journal App, selected location NPC section.",
            },
        },
        {
            subject_header: "Set your own goals!",
            sub_header:
                "Set goals in the form of quests to help track your adventure!",
            subject_messages: [
                "Create quests to help guide your party.",
                "Assign relevant characters and locations to quests.",
                "Filter between completed and incomplete quests.",
                "Edit your quests values as the story progresses.",
            ],
            image: {
                src: "quest",
                alt: "Tactical Journal App, selected location quest section",
            },
        },
        // {
        //     subject_header: "Begin creating memories!",
        //     sub_header: "Start your journey by creating memories!",
        // },
    ];

    // Changes left arrow styles if contentDisplayProgress === 0
    useEffect(() => {
        if (contentDisplayProgress === 0) {
            setLeftArrowStyles({
                filter: `opacity(0.20)`,
                cursor: "default",
            });
        } else {
            setLeftArrowStyles({
                filter: `opacity(1)`,
                cursor: "pointer",
            });
        }
    }, [contentDisplayProgress]);

    // Changes right arrow styles if contentDisplayProgress === contentDisplay.Length - 1
    useEffect(() => {
        if (contentDisplayProgress === contentDisplay.length - 1) {
            setRightArrowStyles({
                filter: `opacity(0.20)`,
                cursor: "default",
            });
        } else {
            setRightArrowStyles({
                filter: `opacity(1)`,
                cursor: "pointer",
            });
        }
    }, [contentDisplayProgress, contentDisplay.length]);

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
                        <div id="login-screen-content-display-wrapper">
                            {newUser === false ? (
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
                                    dataNotifications={dataNotifications}
                                    setDataNotifications={setDataNotifications}
                                />
                            )}
                        </div>
                    ) : (
                        <div id="content-display-wrapper">
                            <div id="content-display-image-wrapper">
                                <img
                                    src={`images/showcase-images/seros-${contentDisplay[contentDisplayProgress].image.src}.png`}
                                    alt={`${contentDisplay[contentDisplayProgress].image.alt}`}
                                />
                            </div>
                            <div id="content-display-list-wrapper">
                                {contentDisplay[
                                    contentDisplayProgress
                                ].subject_messages.map((message) => {
                                    return (
                                        <div
                                            className="content-display-list-text"
                                            key={message}
                                        >
                                            {message}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Scroll bar wrapper */}
                <div id="content-display-scroller-wrapper">
                    <div id="content-display-scroller-progress">
                        <div
                            className="login-screen-arrow-wrapper"
                            id="left-arrow"
                        >
                            <FontAwesomeIcon
                                icon="chevron-left"
                                className="content-showcase-fa-icon"
                                style={leftArrowStyles}
                                onClick={() => {
                                    if (contentDisplayProgress === 0) {
                                        return;
                                    }
                                    setContentDisplayProgress(
                                        contentDisplayProgress - 1
                                    );
                                }}
                            />
                        </div>
                        {contentDisplay.map((subject, index) => {
                            return (
                                <div
                                    key={subject.subject_header}
                                    className="content-display-scroller-progress-bar"
                                    onClick={() => {
                                        setContentDisplayProgress(index);
                                    }}
                                    style={{
                                        backgroundColor:
                                            contentDisplayProgress === index
                                                ? "white"
                                                : "black",
                                    }}
                                />
                            );
                        })}
                        <div
                            className="login-screen-arrow-wrapper"
                            id="right-arrow"
                        >
                            <FontAwesomeIcon
                                icon="chevron-right"
                                className="content-showcase-fa-icon"
                                style={rightArrowStyles}
                                onClick={() => {
                                    console.log(contentDisplayProgress);
                                    if (
                                        contentDisplayProgress ===
                                        contentDisplay.length - 1
                                    ) {
                                        // setContentDisplayProgress(0);
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
                {/* Arrow wrappers */}
            </div>
        </div>
    );
};

export default LoginWrapper;
