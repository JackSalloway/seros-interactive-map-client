// Style imports
import "./App.css";

// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp,
    faPlus,
    faTimes,
    faTrashCan,
    faPencil,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
// import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import LoginWrapper from "./Components/LoginWrapper/LoginWrapper";
import Dashboard from "./Components/Dashboard/Dashboard";
import MapBox from "./Components/MapBox/MapBox";
import Journal from "./Components/Journal/Journal";
import DeletionModal from "./Components/DeletionModal/DeletionModal";
import DataNotification from "./Components/Notifications/DataNotification";

import { CONTENT_TYPE_APPLICATION_JSON } from "./imports/imports";

// React imports
import { useState, useEffect, useRef } from "react";

function App() {
    // Set states

    // Campaign states
    const [campaign, setCampaign] = useState(null);

    // Data states
    const [serosLocations, setSerosLocations] = useState(null);
    const [serosQuests, setSerosQuests] = useState(null);
    const [serosNPCs, setSerosNPCs] = useState(null);

    // Selected data states
    const [selectedLocationNotes, setSelectedLocationNotes] = useState(null);
    const [selectedLocationQuests, setSelectedLocationQuests] = useState(null);
    const [selectedLocationNPCs, setSelectedLocationNPCs] = useState(null);

    // User states
    const [userAuthenticated, setUserAuthenticated] = useState({});
    const [inputStyles, setInputStyles] = useState({
        visibility: "hidden",
        display: "none",
    });
    // const [startupComplete, setStartupComplete] = useState(false);

    // Map marker states
    const map = useRef();
    const [renderCreationMarker, setRenderCreationMarker] = useState(false);
    const [creationMarkerLatLng, setCreationMarkerLatLng] = useState([0, 0]);
    const [creationMarkerType, setCreationMarkerType] =
        useState("miscellaneous");
    // Map marker edit location states
    const [markerBeingEdited, setMarkerBeingEdited] = useState(null); // This is used to prevent people editing multiple locations at once.
    const [editLocationDetails, setEditLocationDetails] = useState({});
    const [editMarkerLatLng, setEditMarkerLatLng] = useState([]);
    const [editMarkerType, setEditMarkerType] = useState(null);

    const [deleteData, setDeleteData] = useState(null);

    // Notification message state
    const [dataNotifications, setDataNotifications] = useState([]);

    // Render data states

    // Fetch location data from database
    useEffect(() => {
        if (serosLocations !== null) {
            return;
        }

        if (campaign === null) {
            return; // Checks if the user has selected a campaign or not
        }

        fetch(`${process.env.REACT_APP_API_URL}/location_data`, {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify({ campaign_id: campaign }),
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((locations) => setSerosLocations(locations));
    }, [serosLocations, setSerosLocations, campaign]);

    // Fetch quest data from database
    useEffect(() => {
        if (serosQuests !== null) {
            return;
        }

        if (campaign === null) {
            return; // Checks if the user has selected a campaign or not
        }

        fetch(`${process.env.REACT_APP_API_URL}/quest_data`, {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify({ campaign_id: campaign }),
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((quests) => setSerosQuests(quests));
    }, [serosQuests, setSerosQuests, campaign]);

    // Fetch NPC data from database
    useEffect(() => {
        if (serosNPCs !== null) {
            return;
        }

        if (campaign === null) {
            return; // Checks if the user has selected a campaign or not
        }

        fetch(`${process.env.REACT_APP_API_URL}/npc_data`, {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify({ campaign_id: campaign }),
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((NPCs) => setSerosNPCs(NPCs));
    }, [serosNPCs, setSerosNPCs, campaign]);

    // Check cookies on startup to see if user was logged in last time they used the site and their refresh token is still valid.
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/startup`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 401) {
                    throw Error("Session timed out, please login again.");
                }
                return res.json();
            })
            .then((res) => {
                setUserAuthenticated(res);
                if (res.privileged === true) {
                    setInputStyles({ visibility: "visible" });
                }
            })
            .catch((err) => {
                const notificationsCopy = dataNotifications;
                notificationsCopy.push({
                    message: err.message,
                    important: true,
                });
                setDataNotifications(notificationsCopy);
            });
    }, [dataNotifications]);

    // Check if user is authenticated after login - to enable Create, Update and Delete access
    useEffect(() => {
        if (userAuthenticated.privileged === true) {
            setInputStyles({ visibility: "visible" });
        }
    }, [userAuthenticated]);

    library.add(
        faChevronRight,
        faChevronLeft,
        faChevronDown,
        faChevronUp,
        faPlus,
        faTimes,
        faTrashCan,
        faPencil,
        faInfoCircle
    ); // This is used so font awesome icons can be used globally across the app without having to import font awesome everytime.

    // if (startupComplete === false) {
    //     return <LoadingScreen />;
    // }

    if (Object.keys(userAuthenticated).length === 0) {
        return (
            <LoginWrapper
                setUserAuthenticated={setUserAuthenticated}
                dataNotifications={dataNotifications}
                setDataNotifications={setDataNotifications}
            />
        );
    }

    return (
        <>
            {/* This div was used to make the map box and location notes appear next to each other on the same row, however this made the map box function incorreclty due to it not resizing properly so have commented it out for now */}
            <div className="home-page-wrapper">
                {campaign === null ? (
                    <Dashboard
                        userAuthenticated={userAuthenticated}
                        campaigns={userAuthenticated.campaigns ?? []}
                        setCampaign={setCampaign}
                    />
                ) : (
                    <MapBox
                        serosLocations={serosLocations}
                        serosNPCs={serosNPCs}
                        serosQuests={serosQuests}
                        setSerosLocations={setSerosLocations}
                        map={map}
                        renderCreationMarker={renderCreationMarker}
                        creationMarkerLatLng={creationMarkerLatLng}
                        creationMarkerType={creationMarkerType}
                        setCreationMarkerLatLng={setCreationMarkerLatLng}
                        selectedLocationNotes={
                            serosLocations?.[selectedLocationNotes] || null
                        }
                        setSelectedLocationNotes={setSelectedLocationNotes}
                        setSelectedLocationQuests={setSelectedLocationQuests}
                        setSelectedLocationNPCs={setSelectedLocationNPCs}
                        userAuthenticated={userAuthenticated}
                        markerBeingEdited={markerBeingEdited}
                        setMarkerBeingEdited={setMarkerBeingEdited}
                        setEditLocationDetails={setEditLocationDetails}
                        editMarkerLatLng={editMarkerLatLng}
                        setEditMarkerLatLng={setEditMarkerLatLng}
                        editMarkerType={editMarkerType}
                        setEditMarkerType={setEditMarkerType}
                        setDeleteData={setDeleteData}
                    />
                )}

                {map ? (
                    <Journal
                        locationNotes={
                            serosLocations?.[selectedLocationNotes] || null
                        }
                        setLocationNotes={setSelectedLocationNotes}
                        serosNPCs={serosNPCs}
                        setSerosNPCs={setSerosNPCs}
                        locationNPCs={selectedLocationNPCs}
                        setLocationNPCs={setSelectedLocationNPCs}
                        locationQuests={selectedLocationQuests}
                        setLocationQuests={setSelectedLocationQuests}
                        serosLocations={serosLocations}
                        setSerosLocations={setSerosLocations}
                        serosQuests={serosQuests}
                        setSerosQuests={setSerosQuests}
                        setDeleteData={setDeleteData}
                        userAuthenticated={userAuthenticated}
                        setUserAuthenticated={setUserAuthenticated}
                        inputStyles={inputStyles}
                        setInputStyles={setInputStyles}
                        renderCreationMarker={renderCreationMarker}
                        setRenderCreationMarker={setRenderCreationMarker}
                        creationMarkerLatLng={creationMarkerLatLng}
                        setCreationMarkerType={setCreationMarkerType}
                        map={map}
                        markerBeingEdited={markerBeingEdited}
                        setMarkerBeingEdited={setMarkerBeingEdited}
                        editLocationDetails={editLocationDetails}
                        editMarkerLatLng={editMarkerLatLng}
                        setEditMarkerType={setEditMarkerType}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                ) : null}

                {deleteData !== null ? (
                    <DeletionModal
                        data={deleteData}
                        setDeleteData={setDeleteData}
                        selectedLocationNotes={
                            serosLocations?.[selectedLocationNotes] || null
                        }
                        serosLocations={serosLocations}
                        setSerosLocations={setSerosLocations}
                        serosNPCs={serosNPCs}
                        setSerosNPCs={setSerosNPCs}
                        serosQuests={serosQuests}
                        setSerosQuests={setSerosQuests}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                    />
                ) : null}

                {dataNotifications.length !== 0
                    ? dataNotifications.map((notification, index) => {
                          return (
                              <DataNotification
                                  dataNotifications={dataNotifications}
                                  setDataNotifications={setDataNotifications}
                                  notification={notification}
                                  index={index}
                                  key={`${notification.message} ${index}`}
                              />
                          );
                      })
                    : null}
            </div>
        </>
    );
}

export default App;
