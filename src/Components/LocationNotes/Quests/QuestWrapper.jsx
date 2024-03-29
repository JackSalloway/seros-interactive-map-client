import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component imports
import QuestNotes from "./QuestNotes";
import CreateQuest from "./CreateQuest";

const QuestWrapper = (props) => {
    const {
        locationNotes,
        showQuests,
        setShowQuests,
        locationQuests,
        setDeleteData,
        locationList,
        serosQuests,
        setSerosQuests,
        setSerosNPCs,
        setQuestUpdated,
        addNewQuest,
        setAddNewQuest,
        dataNotifications,
        setDataNotifications,
        campaign,
        setChangelogData,
        username,
    } = props;
    return (
        <div
            className="location-notes-category-wrapper"
            style={{ backgroundImage: `url(/images/papyr.jpg)` }}
        >
            <div className="location-notes-category-header">
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
                                serosQuests={serosQuests}
                                setSerosQuests={setSerosQuests}
                                setSerosNPCs={setSerosNPCs}
                                setQuestUpdated={setQuestUpdated}
                                dataNotifications={dataNotifications}
                                setDataNotifications={setDataNotifications}
                                campaign={campaign}
                                setChangelogData={setChangelogData}
                                username={username}
                            />
                        ))}
                        {/* Has new quest been clicked? */}
                        <span
                            className="add-new-data"
                            onClick={() => {
                                setAddNewQuest(!addNewQuest);
                            }}
                        >
                            {addNewQuest === false ? (
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
                        <p>There are no quests here...</p>
                        {/* Has new quest been clicked? */}
                        {addNewQuest === false ? (
                            <FontAwesomeIcon
                                icon="fa-plus"
                                className="location-notes-fa-icon h3 location-notes-fa-plus"
                                onClick={() => {
                                    setAddNewQuest(true);
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon="fa-times"
                                className="location-notes-fa-icon h3 location-notes-fa-cross"
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
                    locationNotes={locationNotes}
                    locationList={locationList}
                    serosQuests={serosQuests}
                    setSerosQuests={setSerosQuests}
                    setAddNewQuest={setAddNewQuest}
                    dataNotifications={dataNotifications}
                    setDataNotifications={setDataNotifications}
                    campaign={campaign}
                    setChangelogData={setChangelogData}
                    username={username}
                />
            ) : null}
        </div>
    );
};

export default QuestWrapper;
