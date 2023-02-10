import React, { useState, useEffect } from "react";
import "./NPCListWrapper.css";
import NPCListNotes from "./NPCListNotes";

const NPCListWrapper = (props) => {
    const {
        serosLocations,
        setLocationNotes,
        serosNPCs,
        setSerosNPCs,
        serosNPCsFiltered,
        map,
        campaign,
        userAuthenticated,
        dataNotifications,
        setDataNotifications,
        setChangelogData,
    } = props;

    // Extract the original index from the returned npc data request
    // const fetchOriginalIndex = serosNPCs.reduce((prevNPCs, npcData, index) => {
    //     return [...prevNPCs, { npcData, originalIndex: index }];
    // }, []);

    const shallowCopy = serosNPCsFiltered.sort(function (a, b) {
        var npcA = a.name.toUpperCase();
        var npcB = b.name.toUpperCase();
        return npcA < npcB ? -1 : npcA > npcB ? 1 : 0;
    });

    // const [NPCList, setNPCList] = useState(serosNPCs);
    const [npcList, setNPCList] = useState(shallowCopy);
    const [searchValue, setFriendlySearchValue] = useState("");

    // Filter the friendly npc list whenever the user edits the friendlySearchValue state
    // This is the use effect causing infinite renders when the deletion modal is rendered.
    // NOTE this only happens when the npc list is active, I assume that it will also apply to the queset list in that case.

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
                        campaignID={campaign.id}
                        username={userAuthenticated.username}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                        serosNPCs={serosNPCs}
                        setSerosNPCs={setSerosNPCs}
                        setChangelogData={setChangelogData}
                    />
                ))}
            </div>
        </div>
    );
};

export default NPCListWrapper;
