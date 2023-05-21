import { useState, useEffect } from "react";
import "./CombatInstanceListNotes.css";
import he from "he";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CombatInstanceListNotes = (props) => {
    const {
        instance,
        campaign,
        combatInstanceData,
        map,
        setLocationNotes,
        serosLocations,
    } = props;

    const [selected, setSelected] = useState(false);

    const expandDownChevron = (
        <FontAwesomeIcon
            icon="chevron-down"
            className="journal-fa-icon"
            onClick={() => {
                setSelected(true);
            }}
        />
    );

    console.log(instance);

    const collapseUpChevron = (
        <FontAwesomeIcon
            icon="chevron-up"
            className="journal-fa-icon"
            onClick={() => {
                setSelected(false);
            }}
        />
    );

    // List object has not been selected
    if (selected === false) {
        return (
            <div className="instance-list-notes-individual instance-list-notes-individual-header">
                <p>{dayjs(instance.created_at).format("DD/MM/YYYY")}: </p>
                <p>{he.decode(instance.name)}</p>
                {expandDownChevron}
            </div>
        );
    }

    // Take first sentence from instance description
    const instanceBriefDesc = he.decode(
        instance.description.split(".")[0] + "..."
    );

    // Render a button to allow the user to jump to the specific associated location
    const associatedLocationButton = () => {
        return (
            <div
                className="instance-list-notes-locations"
                key={instance.associated_location._id}
            >
                <div className="instance-list-notes-locations-name">
                    {he.decode(instance.associated_location.name)}
                </div>
                <button
                    className="instance-list-notes-locations-lat-lng"
                    onClick={() => {
                        if (map.current.getZoom() === 5) {
                            map.current.flyTo(
                                instance.associated_location.latlng
                            );
                        } else {
                            map.current.setView(
                                instance.associated_location.latlng,
                                5
                            );
                        }
                        setLocationNotes(
                            serosLocations
                                .map((serosLocation) => serosLocation._id)
                                .indexOf(instance.associated_location._id)
                        );
                    }}
                >
                    Jump to location!
                </button>
            </div>
        );
    };

    // List object has been selected
    if (selected === true) {
        return (
            <>
                <div className="instance-list-notes-individual instance-list-notes-individual-header">
                    <p>{dayjs(instance.created_at).format("DD/MM/YYYY")}: </p>
                    <p>{he.decode(instance.name)}</p>
                    {collapseUpChevron}
                </div>
                <div className="instance-list-notes-individual instance-list-notes-individual-information">
                    {instance.description !== "" ? (
                        <p>{instanceBriefDesc}</p>
                    ) : (
                        <p>No description provied...</p>
                    )}
                    {associatedLocationButton()}
                </div>
            </>
        );
    }
};

export default CombatInstanceListNotes;
