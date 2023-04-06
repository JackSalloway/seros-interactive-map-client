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

    const shallowCopy = serosNPCsFiltered.sort(function (a, b) {
        var npcA = a.name.toUpperCase();
        var npcB = b.name.toUpperCase();
        return npcA < npcB ? -1 : npcA > npcB ? 1 : 0;
    });

    const [npcList, setNPCList] = useState(shallowCopy);
    const [searchValue, setFriendlySearchValue] = useState("");

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
        <div id="npc-list-wrapper" className="journal-content-wrapper">
            <div className="npc-list-wrapper-category" id="npc-list-friendly">
                <div
                    id="npc-list-wrapper-header"
                    className="content-wrapper-header"
                >
                    <h2>{campaign.campaign.name}</h2>
                    <h3>NPC List</h3>
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
                        campaignID={campaign.campaign.id}
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
