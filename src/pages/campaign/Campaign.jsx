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
    const [locations, setLocations] = useState(null);
    const [quests, setQuests] = useState(null);
    const [serosNPCs, setSerosNPCs] = useState(null);
    const [changelogData, setChangelogData] = useState(null); // Changed the naming scheme of this state value as I would like to remove the Seros part from all other values
    const [combatInstanceData, setCombatInstanceData] = useState(null);

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

        // fetch(
        //     `${process.env.REACT_APP_API_URL}/quest_data/?campaign_id=${campaignParams.campaignId}`,
        //     {
        //         method: "GET",
        //         mode: "cors",
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((quests) => setQuests(quests));
    }, [quests, setQuests, campaignId]);

    // Fetch NPC data from database
    // useEffect(() => {
    //     if (serosNPCs !== null) {
    //         return;
    //     }

    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/npc_data/?campaign_id=${campaignParams.campaignId}`,
    //         {
    //             method: "GET",
    //             mode: "cors",
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((NPCs) => setSerosNPCs(NPCs));
    // }, [serosNPCs, setSerosNPCs, campaignParams]);

    // Fetch changelog data from database
    // useEffect(() => {
    //     if (changelogData !== null) {
    //         return;
    //     }

    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/changelog_data/?campaign_id=${campaignParams.campaignId}`,
    //         {
    //             method: "GET",
    //             mode: "cors",
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((changelog) => {
    //             if (changelog === null) {
    //                 setChangelogData([]);
    //                 return;
    //             }
    //             setChangelogData(changelog.changes);
    //         });
    // }, [changelogData, campaignParams]);

    // Fetch combat instance data from database
    // useEffect(() => {
    //     if (combatInstanceData !== null) {
    //         return;
    //     }

    //     fetch(
    //         `${process.env.REACT_APP_API_URL}/combat_instance_data/?campaign_id=${campaignParams.campaignId}`,
    //         {
    //             method: "GET",
    //             mode: "cors",
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((combatInstances) => {
    //             if (combatInstances === null) {
    //                 setCombatInstanceData([]);
    //                 return;
    //             }
    //             setCombatInstanceData(combatInstances);
    //         });
    // });

    // Campaign has been selected so render a map and a journal sidebar
    return (
        <div className="map-screen-wrapper">
            <MapBox
                locations={locations}
                serosNPCs={serosNPCs}
                quests={quests}
                combatInstanceData={combatInstanceData}
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
                serosNPCs={serosNPCs}
                setSerosNPCs={setSerosNPCs}
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
                changelogData={changelogData}
                setChangelogData={setChangelogData}
                combatInstanceData={combatInstanceData}
                setCombatInstanceData={setCombatInstanceData}
            />
            {/* If deleteData state has is not null render the DeletionModal */}
            {deleteData !== null ? (
                <DeletionModal
                    data={deleteData}
                    setDeleteData={setDeleteData}
                    selectedLocationNotes={
                        locations?.[selectedLocationNotes] || null
                    }
                    locations={locations}
                    setLocations={setLocations}
                    serosNPCs={serosNPCs}
                    setSerosNPCs={setSerosNPCs}
                    quests={quests}
                    setQuests={setQuests}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    username={user.username}
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
};

export default Campaign;
