import { useState, useEffect } from "react";
import CombatInstanceListNotes from "./CombatInstanceListNotes";

const CombatInstanceListWrapper = (props) => {
    const {
        locations,
        setLocationNotes,
        // combatInstanceData,
        combatInstanceDataFiltered,
        map,
        campaign,
    } = props;

    const [instanceList, setInstanceList] = useState(
        combatInstanceDataFiltered
    );
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (searchValue === "") {
            setInstanceList(combatInstanceDataFiltered);
            return;
        } else {
            setInstanceList(
                combatInstanceDataFiltered.filter((instance) =>
                    instance.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, combatInstanceDataFiltered]);

    return (
        <div id="instance-list-wrapper" className="journal-content-wrapper">
            <div className="instance-list-wrapper-category" id="instance-list">
                <div
                    id="instance-list-wrapper-header"
                    className="content-wrapper-header"
                >
                    <h2>{campaign.campaign_name}</h2>
                    <h3>Combat Instance List</h3>
                    <input
                        type="text"
                        placeholder="Search for a combat instance!"
                        onChange={({ target }) => setSearchValue(target.value)}
                    />
                </div>
                {instanceList.map((instance, index) => (
                    <CombatInstanceListNotes
                        key={instance.name + index}
                        instance={instance}
                        // campaign={campaign}
                        // combatInstanceData={combatInstanceData}
                        map={map}
                        setLocationNotes={setLocationNotes}
                        locations={locations}
                    />
                ))}
            </div>
        </div>
    );
};

export default CombatInstanceListWrapper;
