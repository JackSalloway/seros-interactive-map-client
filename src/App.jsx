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
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import MapBox from "./Components/MapBox/MapBox";
import Journal from "./Components/Journal/Journal";
import CreationSidebar from "./Components/CreationSidebar/CreationSidebar";
import CreateLocationForm from "./Components/CreationForms/CreateLocationForm";
import CreateQuestForm from "./Components/CreationForms/CreateQuestForm";
import CreateNPCForm from "./Components/CreationForms/CreateNPCForm";
import DeletionModal from "./Components/DeletionModal/DeletionModal";
import QuestList from "./Components/QuestList/QuestList";

// React imports
import { useState, useEffect } from "react";

function App() {
    // Set states
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
    const [startupComplete, setStartupComplete] = useState(false);

    // Map marker states
    const [renderCreationMarker, setRenderCreationMarker] = useState(false);
    const [creationMarkerLatLng, setCreationMarkerLatLng] = useState([0, 0]);

    // Render creation form states
    const [renderCreationSidebar, setRenderCreationSidebar] = useState(false);
    const [renderLocationCreationForm, setRenderLocationCreationForm] =
        useState(false);
    const [renderQuestCreationForm, setRenderQuestCreationForm] =
        useState(false);
    const [renderNPCCreationForm, setRenderNPCCreationForm] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    // Render data states
    const [renderQuestList, setRenderQuestList] = useState(false);

    // Fetch location data from database
    useEffect(() => {
        if (serosLocations !== null) {
            return;
        }

        fetch("https://seros-interactive-map.herokuapp.com/location_data", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((locations) => setSerosLocations(locations));
    }, [serosLocations, setSerosLocations]);

    // Fetch quest data from database
    useEffect(() => {
        if (serosQuests !== null) {
            return;
        }

        fetch("https://seros-interactive-map.herokuapp.com/quest_data", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((quests) => setSerosQuests(quests));
    }, [serosQuests, setSerosQuests]);

    // Fetch NPC data from database
    useEffect(() => {
        if (serosNPCs !== null) {
            return;
        }

        fetch("https://seros-interactive-map.herokuapp.com/npc_data", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((NPCs) => setSerosNPCs(NPCs));
    }, [serosNPCs, setSerosNPCs]);

    // Check cookies on startup to see if user was logged in last time they used the site and their refresh token is still valid.
    useEffect(() => {
        fetch("https://seros-interactive-map.herokuapp.com/startup", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .then((res) => {
                setUserAuthenticated(res);
                if (res.privilege === true) {
                    setInputStyles({ visibility: "visible" });
                }
            })
            .then(setStartupComplete(true));
    }, []);

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
        faPencil
    ); // This is used so font awesome icons can be used globally across the app without having to import font awesome everytime.

    if (startupComplete === false) {
        return <LoadingScreen />;
    }

    return (
        <>
            {/* This div was used to make the map box and location notes appear next to each other on the same row, however this made the map box function incorreclty due to it not resizing properly so have commented it out for now */}
            <div className="home-page-wrapper">
                <MapBox
                    serosLocations={serosLocations}
                    serosNPCs={serosNPCs}
                    serosQuests={serosQuests}
                    setSerosLocations={setSerosLocations}
                    renderCreationMarker={renderCreationMarker}
                    creationMarkerLatLng={creationMarkerLatLng}
                    setCreationMarkerLatLng={setCreationMarkerLatLng}
                    renderLocationCreationForm={renderLocationCreationForm}
                    setRenderLocationCreationForm={
                        setRenderLocationCreationForm
                    }
                    selectedLocationNotes={
                        serosLocations?.[selectedLocationNotes] || null
                    }
                    setSelectedLocationNotes={setSelectedLocationNotes}
                    setSelectedLocationQuests={setSelectedLocationQuests}
                    setSelectedLocationNPCs={setSelectedLocationNPCs}
                />

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
                />

                <CreationSidebar
                    renderCreationSidebar={renderCreationSidebar}
                    setRenderCreationSidebar={setRenderCreationSidebar}
                    renderCreationMarker={renderCreationMarker}
                    setRenderCreationMarker={setRenderCreationMarker}
                    setRenderQuestCreationForm={setRenderQuestCreationForm}
                    setRenderNPCCreationForm={setRenderNPCCreationForm}
                    setRenderQuestList={setRenderQuestList}
                />

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
                    />
                ) : null}
            </div>

            {renderLocationCreationForm === true ? (
                <CreateLocationForm
                    creationMarkerLatLng={creationMarkerLatLng}
                    setRenderLocationCreationForm={
                        setRenderLocationCreationForm
                    }
                />
            ) : null}

            {renderQuestCreationForm === true ? (
                <CreateQuestForm
                    setRenderQuestCreationForm={setRenderQuestCreationForm}
                    serosLocations={serosLocations}
                />
            ) : null}

            {renderNPCCreationForm === true ? (
                <CreateNPCForm
                    setRenderNPCCreationForm={setRenderNPCCreationForm}
                    serosLocations={serosLocations}
                    serosQuests={serosQuests}
                />
            ) : null}

            {renderQuestList === true ? (
                <QuestList serosQuests={serosQuests} />
            ) : null}
        </>
    );
}

export default App;
