// jsx file to render all quests on the screen
// Each quest could potentially link to the locations that they are tied to and allow the user to 'jump' to that specific locations notes

import React, { useState, useEffect } from "react";
import "./QuestListWrapper.css";
import QuestListNotes from "./QuestListNotes";

const QuestListWrapper = (props) => {
    const { serosQuests, showTooltip } = props;

    const [questList, SetQuestList] = useState(serosQuests);
    // const [showTooltip, setShowTooltip] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Filter the quest list whenever the user edits the searchValue state
    useEffect(() => {
        if (searchValue === "") {
            SetQuestList(serosQuests);
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
            {showTooltip === true ? (
                <div id="quest-list-tooltip">
                    <p>
                        <span className="span-color-green">Completed</span>{" "}
                        quests are colored
                        <span className="span-color-green"> green</span>.
                    </p>
                    <p>
                        <span className="span-color-red">Incomplete</span>{" "}
                        quests are colored
                        <span className="span-color-red"> red</span>.
                    </p>
                </div>
            ) : null}
            <div id="quest-list-wrapper-header">
                <input
                    type="text"
                    placeholder="Search for a quest!"
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            </div>

            {questList.map((quest) => (
                <QuestListNotes quest={quest} key={quest._id} />
            ))}
        </div>
    );
};

export default QuestListWrapper;
