import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";

//Style imports
import "./CampaignDeletionModal.css";

// Component imports
// import DeleteLocation from "./DeleteLocation";
// import DeleteSubLocation from "./DeleteSubLocation";
// import DeleteNPC from "./DeleteNPC";
// import DeleteQuest from "./DeleteQuest";
// import DeleteCombatInstance from "./DeleteCombatInstance";

const CampaignDeletionModal = (props) => {
    const {
        deleteData,
        setDeleteData,
        dataNotifications,
        setDataNotifications,
    } = props;

    const [deletionString, setDeletionString] = useState("");
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    const [locationCount, setLocationCount] = useState("");
    const [npcCount, setNPCCount] = useState("");
    const [questCount, setQuestCount] = useState("");
    const [instanceCount, setInstanceCount] = useState("");

    const deleteCampaignString = "DELETE-CAMPAIGN: "; // Wanted to do this as deleting a location is quite a serious thing.

    // Effect to retrieve all major data that the campaign contains - Locations, NPCs, Quests, Combat Instances
    useEffect(() => {
        const fetchData = async () => {
            const req = await fetch(
                `${process.env.REACT_APP_API_URL}/campaign_data_count/?campaign_id=${deleteData.id}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const res = await req.json();

            // Set data count values
            setLocationCount(res.locationCount);
            setNPCCount(res.npcCount);
            setQuestCount(res.questCount);
            setInstanceCount(res.instanceCount);
        };
        fetchData().catch((err) => console.log(err));
    }, [deleteData]);

    // useEffect(() => {
    //     if (players !== null) {
    //         return;
    //     }

    //     const fetchData = async () => {
    //         const res = await fetch(
    //             `${process.env.REACT_APP_API_URL}/campaign_player_data/?campaign_id=${campaign.id}`,
    //             {
    //                 method: "GET",
    //                 mode: "cors",
    //             }
    //         );
    //         const resPlayers = await res.json();
    //         setPlayers(resPlayers);
    //     };

    //     fetchData().catch((err) => console.log(err));
    // }, [campaign, players]);

    // Effect to check the user input matches the required deleteCampaignString
    useEffect(() => {
        if (
            deletionString ===
            deleteCampaignString + he.decode(deleteData.name)
        ) {
            setDeleteDisabled(true);
        } else {
            setDeleteDisabled(false);
        }
    }, [deleteData, deletionString]);

    return (
        <div>
            <div id="deletion-modal-blur"></div>
            <div id="deletion-modal">
                <FontAwesomeIcon
                    icon="fa-times"
                    className="deletion-modal-fa-icon location-notes-fa-cross"
                    onClick={() => {
                        setDeleteData(null);
                    }}
                />
                <h1>Delete campaign data</h1>
                <div id="deletion-modal-p">
                    <p>
                        Are you sure you want to delete the{" "}
                        <span className="data-to-delete">
                            {he.decode(deleteData.name)}
                        </span>{" "}
                        campaign?
                    </p>
                    <p>
                        This action cannot be undone. This will permanently
                        delete the campaign data and any relations it has to
                        other data.
                    </p>
                    <div className="deletion-modal-warning">
                        <h3>WARNING</h3>
                        <p>
                            As this is a campaign, this will also delete all
                            data that references it:
                        </p>
                        <ul>
                            <li className="deletion-modal-warning-bold">
                                Locations in this campaign: {locationCount}
                            </li>
                            <li className="deletion-modal-warning-bold">
                                NPCs in this campaign: {npcCount}
                            </li>
                            <li className="deletion-modal-warning-bold">
                                Quests in this campaign: {questCount}
                            </li>
                            <li className="deletion-modal-warning-bold">
                                Combat instances in this campaign:{" "}
                                {instanceCount}
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="deletion-modal-p">
                    <p>
                        Please type{" "}
                        <span className="data-to-delete">
                            {deleteCampaignString + he.decode(deleteData.name)}
                        </span>{" "}
                        to confirm.
                    </p>
                </div>
                <form
                    onSubmit={
                        null
                        // deleteLocation
                    }
                    id="deletion-modal-form"
                >
                    <input
                        type="text"
                        onChange={({ target }) => {
                            setDeletionString(target.value);
                        }}
                    />
                    <button disabled={deleteDisabled === true ? false : true}>
                        I understand what I am doing. Delete data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CampaignDeletionModal;
