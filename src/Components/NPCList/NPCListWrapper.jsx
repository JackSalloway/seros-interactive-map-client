import React, { useState, useEffect } from "react";
import "./NPCListWrapper.css";
import NPCListNotes from "./NPCListNotes";

const NPCListWrapper = (props) => {
    const {
        locations,
        setLocationNotes,
        npcs,
        setNPCs,
        npcsFiltered,
        map,
        campaign,
        userAuthenticated,
        dataNotifications,
        setDataNotifications,
        setChangelogData,
    } = props;

    const shallowCopy = npcsFiltered.sort(function (a, b) {
        var npcA = a.name.toUpperCase();
        var npcB = b.name.toUpperCase();
        return npcA < npcB ? -1 : npcA > npcB ? 1 : 0;
    });

    const [npcList, setNPCList] = useState(shallowCopy);
    const [searchValue, setSearchValue] = useState("");

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
                    <h2>{campaign.campaign_name}</h2>
                    <h3>NPC List</h3>
                    <input
                        type="text"
                        placeholder="Search for an NPC!"
                        onChange={({ target }) => setSearchValue(target.value)}
                    />
                </div>
                {npcList.map((npc) => (
                    <NPCListNotes
                        npc={npc}
                        key={npc.id}
                        map={map}
                        locations={locations}
                        setLocationNotes={setLocationNotes}
                        campaignID={campaign.campaign_id}
                        username={userAuthenticated.username}
                        dataNotifications={dataNotifications}
                        setDataNotifications={setDataNotifications}
                        npcs={npcs}
                        setNPCs={setNPCs}
                        setChangelogData={setChangelogData}
                    />
                ))}
            </div>
        </div>
    );
};

export default NPCListWrapper;
