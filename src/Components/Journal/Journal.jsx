import React from "react";
import axios from "axios";
import "./Journal.css";
import LoginWrapper from "../LoginWrapper.jsx/LoginWrapper";
import LocationNotes from "../LocationNotes/LocationNotes";

const Journal = (props) => {
    const {
        locationNotes,
        setLocationNotes,
        serosNPCs,
        setSerosNPCs,
        locationNPCs,
        setLocationNPCs,
        locationQuests,
        setLocationQuests,
        serosLocations,
        setSerosLocations,
        serosQuests,
        setSerosQuests,
        setDeleteData,
        userAuthenticated,
        setUserAuthenticated,
        inputStyles,
        setInputStyles,
    } = props;

    const logout = async () => {
        await axios({
            method: "post",
            // withCredentials: true,
            url: "https://seros-interactive-map.herokuapp.com/logout",
        });
        // Set value to true
        setUserAuthenticated({});
        setInputStyles({ visibility: "hidden", display: "none" });
    };

    // If a location has not been selected yet, display the front page
    if (locationNotes === null) {
        return (
            <div id="journal-front-page-container" className="journal">
                {Object.keys(userAuthenticated).length === 0 ? (
                    <LoginWrapper setUserAuthenticated={setUserAuthenticated} />
                ) : (
                    <div className="login-status">
                        <p id="status-username">
                            Welcome back {userAuthenticated.username}!
                        </p>
                        {userAuthenticated.privileged === true ? (
                            <p>You are authorized to make changes!</p>
                        ) : (
                            <p>
                                You are not authroized to make changes. Contact
                                an admin if you want to change this.
                            </p>
                        )}
                        <button
                            id="logout-button"
                            onClick={() => {
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
                <div id="journal-front-page-logo">
                    <img src="images/SerosLogo2.png" alt="" id="seros-logo" />
                </div>
                <div id="journal-front-page-title">
                    <h1>Tactical Journal</h1>
                </div>
                <div id="journal-front-page-instructions">
                    <h2>Select a location to display notes!</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="journal">
            <LocationNotes
                locationNotes={locationNotes}
                setLocationNotes={setLocationNotes}
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
                locationNPCs={locationNPCs}
                setLocationNPCs={setLocationNPCs}
                locationQuests={locationQuests}
                setLocationQuests={setLocationQuests}
                serosLocations={serosLocations}
                setSerosLocations={setSerosLocations}
                serosQuests={serosQuests}
                setSerosQuests={setSerosQuests}
                setDeleteData={setDeleteData}
                userAuthenticated={userAuthenticated}
                inputStyles={inputStyles}
            />
        </div>
    );
};

export default Journal;
