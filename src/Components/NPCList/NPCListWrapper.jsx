import React, { useState, useEffect } from "react";
import "./NPCListWrapper.css";
import NPCListNotes from "./NPCListNotes";

const NPCListWrapper = (props) => {
    const { serosLocations, setLocationNotes, serosNPCs, map } = props;

    // const [NPCList, setNPCList] = useState(serosNPCs);
    const [friendlyNPCList, setFriendlyNPCList] = useState(
        serosNPCs.filter((npc) => npc.disposition === "Friendly")
    );
    const [friendlySearchValue, setFriendlySearchValue] = useState("");
    const [hostileNPCList, setHostileNPCList] = useState(
        serosNPCs.filter((npc) => npc.disposition === "Hostile")
    );
    const [hostileSearchValue, setHostileSearchValue] = useState("");

    // Filter the friendly npc list whenever the user edits the friendlySearchValue state
    useEffect(() => {
        if (friendlySearchValue === "") {
            setFriendlyNPCList(
                serosNPCs.filter((npc) => npc.disposition === "Friendly")
            );
            return;
        } else {
            setFriendlyNPCList(
                serosNPCs
                    .filter((npc) => npc.disposition === "Friendly")
                    .filter((npc) =>
                        npc.name
                            .toLowerCase()
                            .includes(friendlySearchValue.toLowerCase())
                    )
            );
        }
    }, [friendlySearchValue, serosNPCs]);

    // Filter the hostile npc list whenever the user edits the hostileSearchValue state
    useEffect(() => {
        if (hostileSearchValue === "") {
            setHostileNPCList(
                serosNPCs.filter((npc) => npc.disposition === "Hostile")
            );
        } else {
            setHostileNPCList(
                serosNPCs
                    .filter((npc) => npc.disposition === "Hostile")
                    .filter((npc) =>
                        npc.name
                            .toLowerCase()
                            .includes(hostileSearchValue.toLowerCase())
                    )
            );
        }
    }, [hostileSearchValue, serosNPCs]);

    return (
        <div id="npc-list-wrapper">
            <div className="npc-list-wrapper-category" id="npc-list-friendly">
                <div id="npc-list-wrapper-header">
                    <input
                        type="text"
                        placeholder="Search for a friendly NPC!"
                        onChange={({ target }) =>
                            setFriendlySearchValue(target.value)
                        }
                    />
                </div>
                {friendlyNPCList.map((npc) => (
                    <NPCListNotes
                        npc={npc}
                        key={npc._id}
                        map={map}
                        serosLocations={serosLocations}
                        setLocationNotes={setLocationNotes}
                    />
                ))}
            </div>
            <div className="npc-list-wrapper-category" id="npc-list-hostile">
                <div id="npc-list-wrapper-header">
                    <input
                        type="text"
                        placeholder="Search for a hostile NPC!"
                        onChange={({ target }) =>
                            setHostileSearchValue(target.value)
                        }
                    />
                </div>
                {hostileNPCList.map((npc) => (
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
