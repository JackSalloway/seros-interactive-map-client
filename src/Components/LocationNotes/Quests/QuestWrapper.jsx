import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import QuestNotes from "./QuestNotes";
import CreateQuest from "./CreateQuest";

const QuestWrapper = (props) => {
    const {
        showQuests,
        setShowQuests,
        locationQuests,
        setDeleteData,
        locationList,
        inputStyles,
        serosQuests,
        setSerosQuests,
        setSerosNPCs,
        setQuestUpdated,
        addNewQuest,
        setAddNewQuest,
    } = props;
    return (
        <div className="location-notes-category-wrapper">
            <div className="location-notes-category-header">
                <div className="location-notes-category-wrapper-images-wrapper">
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/tied-scroll.png"
                        alt="tied scroll icon"
                    />
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/relic-blade.png"
                        alt="relic blade icon"
                    />
                </div>
                <h3>Quests</h3>
                {showQuests === false ? (
                    <FontAwesomeIcon
                        icon="chevron-down"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowQuests(!showQuests);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon="chevron-up"
                        className="location-notes-fa-icon h3"
                        onClick={() => {
                            setShowQuests(!showQuests);
                        }}
                    />
                )}
                <div className="location-notes-category-wrapper-images-wrapper">
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/rupee.png"
                        alt="rupee icon"
                    />
                    <img
                        className="location-notes-category-wrapper-image"
                        src="images/treasure-map.png"
                        alt="treasure map icon"
                    />
                </div>
            </div>
            {/* Has quests dropdown been clicked? */}
            {showQuests === true ? (
                locationQuests.length > 0 ? (
                    <>
                        {locationQuests.map((quest) => (
                            <QuestNotes
                                quest={quest.questData}
                                originalIndex={quest.originalIndex}
                                key={quest.questData._id}
                                setDeleteData={setDeleteData}
                                locationList={locationList}
                                inputStyles={inputStyles}
                                serosQuests={serosQuests}
                                setSerosQuests={setSerosQuests}
                                setSerosNPCs={setSerosNPCs}
                                setQuestUpdated={setQuestUpdated}
                            />
                        ))}
                        {/* Has new quest been clicked? */}
                        {addNewQuest === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewQuest(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewQuest(false);
                                }}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <p>There are no quests here...</p>
                        {/* Has new quest been clicked? */}
                        {addNewQuest === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewQuest(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
                                style={inputStyles}
                                onClick={() => {
                                    setAddNewQuest(false);
                                }}
                            />
                        )}
                    </>
                )
            ) : null}
            {/* Has new quest been clicked? */}
            {addNewQuest === true ? (
                <CreateQuest
                    locationList={locationList}
                    serosQuests={serosQuests}
                    setSerosQuests={setSerosQuests}
                    setAddNewQuest={setAddNewQuest}
                />
            ) : null}
        </div>
    );
};

export default QuestWrapper;
