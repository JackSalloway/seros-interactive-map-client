// jsx file to render all quests on the screen
// Each quest could potentially link to the locations that they are tied to and allow the user to 'jump' to that specific locations notes

import "./QuestList.css";

import React from "react";

const QuestList = (props) => {
    const { serosQuests } = props;

    console.log(serosQuests);

    const renderQuestList = (quest) => {
        return (
            <div className="quest-list-individual-quest">
                <h2>{quest.name}</h2>
                <p>{quest.desc}</p>
                <div>
                    <button>View Details</button>
                    <button>Delete Quest</button>
                </div>
            </div>
        );
    };

    return (
        <div id="quest-list-wrapper">
            <h1>Quest List</h1>
            {serosQuests.length !== 0 ? (
                serosQuests.map((quest) => renderQuestList(quest))
            ) : (
                <p>No quests to render, create one first!</p>
            )}
        </div>
    );
};

export default QuestList;
