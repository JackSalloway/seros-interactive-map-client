// React imports
import { useState, useEffect, useRef } from "react";

// react-router-dom imports
import { useParams, useMatches } from "react-router-dom";

// Component imports
import MapBox from "../../Components/MapBox/MapBox";
import Journal from "../../Components/Journal/Journal";
import DeletionModal from "../../Components/DeletionModal/DeletionModal";
import DataNotification from "../../Components/Notifications/DataNotification";

const Campaign = () => {
    let campaignParams = useParams();
    const campaignId = parseInt(campaignParams.campaignId);

    let matches = useMatches();
    let user = matches
        .filter((match) => Boolean(match.handle?.user))
        .map((match) => match.data)[0];

    // Retrieve selected campaign data
    const campaign = user.campaigns.filter(
        (campaign) => campaign.campaign_id === campaignId
    )[0];

    // Data states
    const [players, setPlayers] = useState(null);
    const [locations, setLocations] = useState(null);
    const [quests, setQuests] = useState(null);
    const [npcs, setNPCs] = useState(null);
    const [changelog, setChangelog] = useState(null); // Changed the naming scheme of this state value as I would like to remove the Seros part from all other values
    const [combatInstances, setCombatInstances] = useState(null);

    // Selected data states
    const [selectedLocationNotes, setSelectedLocationNotes] = useState(null);
    const [selectedLocationQuests, setSelectedLocationQuests] = useState(null);
    const [selectedLocationNPCs, setSelectedLocationNPCs] = useState(null);
    const [
        selectedLocationCombatInstances,
        setSelectedLocationCombatInstances,
    ] = useState(null);

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

    // Data notification states
    const [dataNotifications, setDataNotifications] = useState([]);

    // Render data states
    useEffect(() => {
        if (players !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/campaign_player_data/?campaign_id=${campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const resPlayers = await res.json();
            setPlayers(resPlayers);
        };

        fetchData().catch((err) => console.log(err));
    }, [campaignId, players]);

    // Fetch location data from database
    useEffect(() => {
        if (locations !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/location_data/?campaign_id=${campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const resLocations = await res.json();
            setLocations(resLocations);
        };

        fetchData().catch((err) => console.log(err));
    }, [locations, setLocations, campaignId]);

    // Fetch quest data from database
    useEffect(() => {
        if (quests !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/quest_data/?campaign_id=${campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const resQuests = await res.json();
            setQuests(resQuests);
        };

        fetchData().catch((err) => console.log(err));
    }, [quests, setQuests, campaignId]);

    // Fetch NPC data from database
    useEffect(() => {
        if (npcs !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/npc_data/?campaign_id=${campaignParams.campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const resNPCs = await res.json();
            setNPCs(resNPCs);
        };

        fetchData().catch((err) => console.log(err));
    }, [npcs, setNPCs, campaignParams]);

    // Fetch changelog data from database
    useEffect(() => {
        if (changelog !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/changelog_data/?campaign_id=${campaignParams.campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const resChangelogs = await res.json();
            setChangelog(resChangelogs);
        };
        fetchData().catch((err) => console.log(err));
    }, [changelog, campaignParams]);

    // Fetch combat instance data from database
    useEffect(() => {
        if (combatInstances !== null) {
            return;
        }

        const fetchData = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/combat_instance_data/?campaign_id=${campaignParams.campaignId}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );

            const resCombatInstances = await res.json();
            setCombatInstances(resCombatInstances);
        };

        fetchData().catch((err) => console.log(err));
    }, [campaignParams, combatInstances]);

    // Campaign has been selected so render a map and a journal sidebar
    return (
        <div className="map-screen-wrapper">
            <MapBox
                locations={locations}
                npcs={npcs}
                quests={quests}
                combatInstances={combatInstances}
                setLocations={setLocations}
                map={map}
                renderCreationMarker={renderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                creationMarkerType={creationMarkerType}
                setCreationMarkerLatLng={setCreationMarkerLatLng}
                selectedLocationNotes={
                    locations?.[selectedLocationNotes] || null
                }
                setSelectedLocationNotes={setSelectedLocationNotes}
                setSelectedLocationQuests={setSelectedLocationQuests}
                setSelectedLocationNPCs={setSelectedLocationNPCs}
                setSelectedLocationCombatInstances={
                    setSelectedLocationCombatInstances
                }
                userAuthenticated={user}
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
                locationNotes={locations?.[selectedLocationNotes] || null}
                setLocationNotes={setSelectedLocationNotes}
                npcs={npcs}
                setNPCs={setNPCs}
                locationNPCs={selectedLocationNPCs}
                setLocationNPCs={setSelectedLocationNPCs}
                locationQuests={selectedLocationQuests}
                setLocationQuests={setSelectedLocationQuests}
                locationCombatInstances={selectedLocationCombatInstances}
                setLocationCombatInstances={setSelectedLocationCombatInstances}
                locations={locations}
                setLocations={setLocations}
                quests={quests}
                setQuests={setQuests}
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                userAuthenticated={user}
                renderCreationMarker={renderCreationMarker}
                setRenderCreationMarker={setRenderCreationMarker}
                creationMarkerLatLng={creationMarkerLatLng}
                setCreationMarkerLatLng={setCreationMarkerLatLng}
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
                changelog={changelog}
                setChangelog={setChangelog}
                combatInstances={combatInstances}
                setCombatInstances={setCombatInstances}
                players={players}
                setPlayers={setPlayers}
            />
            {/* If deleteData state has is not null render the DeletionModal */}
            {deleteData !== null ? (
                <DeletionModal
                    deleteData={deleteData}
                    setDeleteData={setDeleteData}
                    selectedLocationNotes={
                        locations?.[selectedLocationNotes] || null
                    }
                    locations={locations}
                    setLocations={setLocations}
                    npcs={npcs}
                    setNPCs={setNPCs}
                    quests={quests}
                    setQuests={setQuests}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    username={user.username}
                    changelog={changelog}
                    setChangelog={setChangelog}
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
};

export default Campaign;
