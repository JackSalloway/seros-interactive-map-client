import React, { useState, useEffect } from "react";
import "./NPCListWrapper.css";
import NPCListNotes from "./NPCListNotes";

const NPCListWrapper = (props) => {
    const { serosLocations, setLocationNotes, serosNPCs, map } = props;

    // Create shallow copy variable for reuse
    const shallowCopy = Array.from(serosNPCs).sort(function (a, b) {
        var npcA = a.name.toUpperCase();
        var npcB = b.name.toUpperCase();
        return npcA < npcB ? -1 : npcA > npcB ? 1 : 0;
    });

    // const [NPCList, setNPCList] = useState(serosNPCs);
    const [npcList, setNPCList] = useState(shallowCopy);
    const [searchValue, setFriendlySearchValue] = useState("");
    // const [hostileNPCList, setHostileNPCList] = useState(
    //     shallowCopy.filter((npc) => npc.disposition === "Hostile")
    // );
    // const [hostileSearchValue, setHostileSearchValue] = useState("");

    // Filter the friendly npc list whenever the user edits the friendlySearchValue state
    useEffect(() => {
        if (searchValue === "") {
            setNPCList(shallowCopy);
            return;
        } else {
            setNPCList(
                shallowCopy.filter((npc) =>
                    npc.name.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, shallowCopy]);

    // Filter the hostile npc list whenever the user edits the hostileSearchValue state
    // useEffect(() => {
    //     if (hostileSearchValue === "") {
    //         setHostileNPCList(
    //             shallowCopy.filter((npc) => npc.disposition === "Hostile") // Think this still works as .sort actually edits the array
    //         );
    //     } else {
    //         setHostileNPCList(
    //             shallowCopy
    //                 .filter((npc) => npc.disposition === "Hostile")
    //                 .filter((npc) =>
    //                     npc.name
    //                         .toLowerCase()
    //                         .includes(hostileSearchValue.toLowerCase())
    //                 )
    //         );
    //     }
    // }, [hostileSearchValue, shallowCopy]);

    return (
        <div id="npc-list-wrapper">
            <div className="npc-list-wrapper-category" id="npc-list-friendly">
                <div id="npc-list-wrapper-header">
                    <input
                        type="text"
                        placeholder="Search for an NPC!"
                        onChange={({ target }) =>
                            setFriendlySearchValue(target.value)
                        }
                    />
                </div>
                {npcList.map((npc) => (
                    <NPCListNotes
                        npc={npc}
                        key={npc._id}
                        map={map}
                        serosLocations={serosLocations}
                        setLocationNotes={setLocationNotes}
                    />
                ))}
            </div>
        </div>
    );
};

export default NPCListWrapper;
