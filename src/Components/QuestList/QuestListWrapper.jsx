// jsx file to render all quests on the screen
// Each quest could potentially link to the locations that they are tied to and allow the user to 'jump' to that specific locations notes

import React, { useState, useEffect } from "react";
import "./QuestListWrapper.css";
import QuestListNotes from "./QuestListNotes";

const QuestListWrapper = (props) => {
    const { serosLocations, setLocationNotes, serosQuests, map } = props;

    const [questList, SetQuestList] = useState(
        serosQuests.sort(function (a, b) {
            var questA = a.name.toUpperCase();
            var questB = b.name.toUpperCase();
            return questA < questB ? -1 : questA > questB ? 1 : 0;
        })
    );
    const [searchValue, setSearchValue] = useState("");

    // Filter the quest list whenever the user edits the searchValue state
    useEffect(() => {
        if (searchValue === "") {
            SetQuestList(serosQuests); // Think this still works as .sort actually edits the array
            return;
        } else {
            SetQuestList(
                serosQuests.filter((quest) =>
                    quest.name.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, serosQuests]);

    // const completedQuests = serosQuests.filter(
    //     (quest) => quest.completed === true
    // );

    // const incompletedQuests = serosQuests.filter(
    //     (quest) => quest.completed === false
    // );

    // const renderQuestList = (quest) => {
    //     return (
    //         <div className="quest-list-individual-quest">
    //             <h2>{he.decode(quest.name)}</h2>
    //             <p>{he.decode(quest.desc)}</p>
    //             <div>
    //                 <button>View Details</button>
    //                 <button>Delete Quest</button>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div id="quest-list-wrapper">
            <div id="quest-list-wrapper-header">
                <input
                    type="text"
                    placeholder="Search for a quest!"
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            </div>

            {questList.map((quest) => (
                <QuestListNotes
                    quest={quest}
                    key={quest._id}
                    map={map}
                    serosLocations={serosLocations}
                    setLocationNotes={setLocationNotes}
                />
            ))}
            {/* Removed the tooltip toggle logic for now, plan to implement it again at a later date within in this and other wrapper components */}
            <div id="quest-list-tooltip">
                <p>
                    <span className="span-color-green">Completed</span> quests
                    are colored
                    <span className="span-color-green"> green</span>.
                </p>
                <p>
                    <span className="span-color-red">Incomplete</span> quests
                    are colored
                    <span className="span-color-red"> red</span>.
                </p>
            </div>
        </div>
    );
};

export default QuestListWrapper;
