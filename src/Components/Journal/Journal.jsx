import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Journal.css";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import LocationNotes from "../LocationNotes/LocationNotes";
import JournalMenuHeaderBox from "../JournalMenu/JournalMenuHeaderBox";
import JournalMenuContent from "../JournalMenu/JournalMenuContent";

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
        setRenderCreationMarker,
        renderCreationMarker,
        creationMarkerLatLng,
        setCreationMarkerType,
        map,
        markerBeingEdited,
        setMarkerBeingEdited,
    } = props;

    const [selectedTab, setSelectedTab] = useState("Front Page");

    useEffect(() => {
        if (markerBeingEdited === true) {
            setSelectedTab("Front Page");
        }
    }, [markerBeingEdited]);

    const logout = async () => {
        await axios({
            method: "get",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/logout`,
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

                <div id="journal-front-page-menu">
                    <div id="journal-front-page-menu-header">
                        <JournalMenuHeaderBox
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            headerValue={"Location List"}
                            boxPosition={"instruction-header-box-end"}
                            markerBeingEdited={markerBeingEdited}
                        />
                        <JournalMenuHeaderBox
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            headerValue={"Quest list"}
                            boxPosition={"instruction-header-box-middle"}
                            markerBeingEdited={markerBeingEdited}
                        />
                        <JournalMenuHeaderBox
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            headerValue={"NPC list"}
                            boxPosition={"instruction-header-box-end"}
                            markerBeingEdited={markerBeingEdited}
                        />
                    </div>
                    <JournalMenuContent
                        serosLocations={serosLocations}
                        setLocationNotes={setLocationNotes}
                        userAuthenticated={userAuthenticated}
                        selectedTab={selectedTab}
                        serosQuests={serosQuests}
                        serosNPCs={serosNPCs}
                        renderCreationMarker={renderCreationMarker}
                        setRenderCreationMarker={setRenderCreationMarker}
                        creationMarkerLatLng={creationMarkerLatLng}
                        setCreationMarkerType={setCreationMarkerType}
                        map={map}
                        markerBeingEdited={markerBeingEdited}
                        setMarkerBeingEdited={setMarkerBeingEdited}
                    />
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
