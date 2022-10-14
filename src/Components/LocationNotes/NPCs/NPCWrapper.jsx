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
        inputStyles,
        serosNPCs,
        setSerosNPCs,
        addNewNPC,
        setAddNewNPC,
        dataNotifications,
        setDataNotifications,
    } = props;

    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(./images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
                <div className="location-notes-category-wrapper-images-wrapper">
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/wizard-face.png"
                        alt="wizard face icon"
                    />
                    {/* <img
                        className="location-notes-category-wrapper-image"
                        src="images/dwarf-face.png"
                        alt="dwarf face icon"
                    /> */}
                </div>
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
                <div className="location-notes-category-wrapper-images-wrapper">
                    {/* <img
                        className="location-notes-category-wrapper-image"
                        src="images/woman-elf-face.png"
                        alt="woman elf face icon"
                    /> */}
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/visored-helm.png"
                        alt="visored helm icon"
                    />
                </div>
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
                                key={npc.npcData._id}
                                setDeleteData={setDeleteData}
                                questList={questList}
                                locationList={locationList}
                                inputStyles={inputStyles}
                                serosNPCs={serosNPCs}
                                setSerosNPCs={setSerosNPCs}
                                dataNotifications={dataNotifications}
                                setDataNotifications={setDataNotifications}
                            />
                        ))}
                        {/* Has add new NPC been clicked? */}
                        {addNewNPC === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewNPC(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewNPC(false);
                                }}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <p>There are no npcs at this location...</p>
                        {/* Has add new NPC been clicked? */}
                        {addNewNPC === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewNPC(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                style={inputStyles}
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
                    serosNPCs={serosNPCs}
                    setSerosNPCs={setSerosNPCs}
                    setAddNewNPC={setAddNewNPC}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                />
            ) : null}
        </div>
    );
};

export default NPCWrapper;
