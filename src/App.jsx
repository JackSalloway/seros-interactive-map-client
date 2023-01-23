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
    faCog,
    faRightFromBracket,
    faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
// import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import LoginWrapper from "./Components/LoginWrapper/LoginWrapper";
import HeaderBar from "./Components/HeaderBar/HeaderBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import MapBox from "./Components/MapBox/MapBox";
import Journal from "./Components/Journal/Journal";
import DeletionModal from "./Components/DeletionModal/DeletionModal";
import DataNotification from "./Components/Notifications/DataNotification";

// React imports
import { useState, useEffect, useRef } from "react";

function App() {
    // Set states

    // Campaign states
    const [campaign, setCampaign] = useState(null);
    const [renderCampaignForm, setRenderCampaignForm] = useState(false);
    const [renderCampaignSettings, setRenderCampaignSettings] = useState(null);

    // Data states
    const [serosLocations, setSerosLocations] = useState(null);
    const [serosQuests, setSerosQuests] = useState(null);
    const [serosNPCs, setSerosNPCs] = useState(null);
    const [changelogData, setChangelogData] = useState(null); // Changed the naming scheme of this state value as I would like to remove the Seros part from all other values

    // Selected data states
    const [selectedLocationNotes, setSelectedLocationNotes] = useState(null);
    const [selectedLocationQuests, setSelectedLocationQuests] = useState(null);
    const [selectedLocationNPCs, setSelectedLocationNPCs] = useState(null);

    // User states
    const [userAuthenticated, setUserAuthenticated] = useState({});

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

        fetch(
            `${process.env.REACT_APP_API_URL}/location_data/?campaign_id=${campaign.id}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
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

        fetch(
            `${process.env.REACT_APP_API_URL}/quest_data/?campaign_id=${campaign.id}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
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

        fetch(
            `${process.env.REACT_APP_API_URL}/npc_data/?campaign_id=${campaign.id}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then((response) => response.json())
            .then((NPCs) => setSerosNPCs(NPCs));
    }, [serosNPCs, setSerosNPCs, campaign]);

    // Fetch changelog data from database
    useEffect(() => {
        if (changelogData !== null) {
            return;
        }

        if (campaign === null) {
            return; // Checks if the user has selected a campaign or not
        }

        fetch(
            `${process.env.REACT_APP_API_URL}/changelog_data/?campaign_id=${campaign.id}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then((response) => response.json())
            .then((changelog) => {
                if (changelog === null) {
                    setChangelogData([]);
                    return;
                }
                setChangelogData(changelog.changes.reverse());
            });
    }, [changelogData, campaign]);

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
            })
            .catch((err) => {
                // const notificationsCopy = dataNotifications;
                // notificationsCopy.push();
                setDataNotifications([
                    {
                        message: err.message,
                        important: true,
                    },
                ]);
            });
    }, []);

    library.add(
        faChevronRight,
        faChevronLeft,
        faChevronDown,
        faChevronUp,
        faPlus,
        faTimes,
        faTrashCan,
        faPencil,
        faInfoCircle,
        faCog,
        faRightFromBracket,
        faHouseUser
    ); // This is used so font awesome icons can be used globally across the app without having to import font awesome everytime.

    // if (startupComplete === false) {
    //     return <LoadingScreen />;
    // }

    if (Object.keys(userAuthenticated).length === 0) {
        return (
            <>
                <LoginWrapper
                    setUserAuthenticated={setUserAuthenticated}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
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
            </>
        );
    }

    // No campaign has been selected so render the campaign select screen
    if (campaign === null) {
        return (
            <div id="campaign-select-wrapper">
                <HeaderBar
                    username={userAuthenticated.username}
                    setUserAuthenticated={setUserAuthenticated}
                    campaign={campaign}
                    setCampaign={setCampaign}
                    setSerosLocations={setSerosLocations}
                    setSerosNPCs={setSerosNPCs}
                    setSerosQuests={setSerosQuests}
                    setRenderCampaignSettings={setRenderCampaignSettings}
                />
                <Dashboard
                    userAuthenticated={userAuthenticated}
                    setUserAuthenticated={setUserAuthenticated}
                    campaigns={userAuthenticated.campaigns ?? []}
                    setCampaign={setCampaign}
                    renderCampaignForm={renderCampaignForm}
                    setRenderCampaignForm={setRenderCampaignForm}
                    renderCampaignSettings={renderCampaignSettings}
                    setRenderCampaignSettings={setRenderCampaignSettings}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
                {/* If there is an object within the dataNotifications state, render dataNotification component () */}
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
        );
    }

    // Campaign has been selected so render a map and a journal sidebar
    return (
        <div className="map-screen-wrapper">
            <HeaderBar
                username={userAuthenticated.username}
                setUserAuthenticated={setUserAuthenticated}
                campaign={campaign}
                setCampaign={setCampaign}
                setSerosLocations={setSerosLocations}
                setSerosNPCs={setSerosNPCs}
                setSerosQuests={setSerosQuests}
                setChangelogData={setChangelogData}
                setRenderCampaignSettings={setRenderCampaignSettings}
            />
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
            <Journal
                locationNotes={serosLocations?.[selectedLocationNotes] || null}
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
                campaign={campaign}
                setCampaign={setCampaign}
                renderCampaignForm={renderCampaignForm}
                setRenderCampaignForm={setRenderCampaignForm}
                renderCampaignSettings={renderCampaignSettings}
                setRenderCampaignSettings={setRenderCampaignSettings}
                changelogData={changelogData}
                setChangelogData={setChangelogData}
            />
            {/* If deleteData state has is not null render the DeletionModal */}
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
                    username={userAuthenticated.username}
                    setChangelogData={setChangelogData}
                />
            ) : null}
            {/* If there is an object within the dataNotifications state, render dataNotification component () */}
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
    );
}

export default App;
