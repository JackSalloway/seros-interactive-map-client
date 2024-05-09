import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import NPCNotes from "./NPCNotes";
import CreateNPC from "./CreateNPC";

const NPCWrapper = (props) => {
    const {
        locationNotes,
        showNPCs,
        setShowNPCs,
        locationNPCs,
        setDeleteData,
        questList,
        locationList,
        npcs,
        setNPCs,
        addNewNPC,
        setAddNewNPC,
        dataNotifications,
        setDataNotifications,
        campaign,
        changelog,
        setChangelog,
        username,
    } = props;

    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(/images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
                <h3>NPCs</h3>
                {showNPCs === false ? (
                    <FontAwesomeIcon
                        icon="chevron-down"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowNPCs(!showNPCs);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon="chevron-up"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowNPCs(!showNPCs);
                        }}
                    />
                )}
            </div>
            {/* Has NPCs dropdown been clicked? */}
            {showNPCs === true ? (
                // Are there more than 0 NPCs at this location
                locationNPCs.length > 0 ? (
                    <>
                        {locationNPCs.map((npc) => (
                            <NPCNotes
                                npc={npc.npcData}
                                originalIndex={npc.originalIndex}
                                key={npc.npcData.id}
                                setDeleteData={setDeleteData}
                                questList={questList}
                                locationList={locationList}
                                npcs={npcs}
                                setNPCs={setNPCs}
                                dataNotifications={dataNotifications}
                                setDataNotifications={setDataNotifications}
                                campaign={campaign}
                                changelog={changelog}
                                setChangelog={setChangelog}
                                username={username}
                            />
                        ))}
                        {/* Has add new NPC been clicked? */}
                        <span
                            className="add-new-data"
                            onClick={() => {
                                setAddNewNPC(!addNewNPC);
                            }}
                        >
                            {addNewNPC === false ? (
                                <FontAwesomeIcon
                                    icon="fa-plus"
                                    className="location-notes-fa-icon h3 location-notes-fa-plus"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon="fa-times"
                                    className="location-notes-fa-icon h3 location-notes-fa-cross"
                                />
                            )}
                        </span>
                    </>
                ) : (
                    <>
                        <p>There are no npcs at this location...</p>
                        {/* Has add new NPC been clicked? */}
                        {addNewNPC === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                onClick={() => {
                                    setAddNewNPC(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                onClick={() => {
                                    setAddNewNPC(false);
                                }}
                            />
                        )}
                    </>
                )
            ) : null}
            {/* Has add new NPC been clicked? */}
            {addNewNPC === true ? (
                <CreateNPC
                    locationNotes={locationNotes}
                    locationList={locationList}
                    questList={questList}
                    npcs={npcs}
                    setNPCs={setNPCs}
                    setAddNewNPC={setAddNewNPC}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    changelog={changelog}
                    setChangelog={setChangelog}
                    username={username}
                />
            ) : null}
        </div>
    );
};

export default NPCWrapper;
