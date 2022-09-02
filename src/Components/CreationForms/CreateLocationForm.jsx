import "./CreateModalForm.css";

import React from "react";
import { useState } from "react";
import { CONTENT_TYPE_APPLICATION_JSON } from "../../imports/imports";

const CreateLocationForm = (props) => {
    // Destructure props
    const { creationMarkerLatLng, setRenderLocationCreationForm } = props;

    // Create state values
    const [locationName, setLocationName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");
    const [locationRegion, setLocationRegion] = useState("Eastern Kae Empire");
    const [locationType, setLocationType] = useState("city");
    const [locationMarked, setLocationMarked] = useState(false);
    const [locationVisited, setLocationVisited] = useState(false);

    // Create post request
    const postData = (e) => {
        e.preventDefault();

        const locationData = {
            location_lat: creationMarkerLatLng[0],
            location_lng: creationMarkerLatLng[1],
            location_name: locationName,
            location_desc: locationDescription,
            location_region: locationRegion,
            location_type: locationType,
            location_marked: locationMarked,
            location_visited: locationVisited,
        };

        const init = {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE_APPLICATION_JSON },
            body: JSON.stringify(locationData),
            // mode: 'cors',
            // cache: 'default',
        };

        fetch("create_location", init);
    };

    return (
        <>
            <div id="creation-form-map-blur-div"></div>
            <div id="creation-form-container">
                <h2>Create a location!</h2>
                <form
                    onSubmit={postData}
                    className="creation-form"
                    id="create-location-form"
                >
                    <div id="create-location-latitude">
                        <label htmlFor="lat">
                            <input
                                id="lat"
                                type="number"
                                value={creationMarkerLatLng[0]}
                                readOnly={true}
                                required
                                hidden
                            />
                        </label>
                    </div>
                    <div id="create-location-longitude">
                        <label htmlFor="lng">
                            <input
                                id="lng"
                                type="number"
                                value={creationMarkerLatLng[1]}
                                readOnly={true}
                                required
                                hidden
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-name"
                    >
                        <label htmlFor="name">
                            Name:
                            <input
                                id="name"
                                type="string"
                                required
                                onChange={({ target }) => {
                                    setLocationName(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-desc"
                    >
                        <label htmlFor="desc">
                            Description:
                            <textarea
                                id="desc"
                                type="text"
                                required
                                onChange={({ target }) => {
                                    setLocationDescription(target.value);
                                }}
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-region"
                    >
                        <label htmlFor="region">
                            Region:
                            <select
                                id="region"
                                placeholder="Select a region"
                                required
                                onChange={({ target }) => {
                                    setLocationRegion(target.value);
                                }}
                            >
                                <option value="Eastern Kae Empire">
                                    Eastern Kae Empire
                                </option>
                                <option value="The Elven Kingdoms">
                                    The Elven Kingdoms
                                </option>
                                <option value="The North">The North</option>
                                <option value="Western Kae Empire">
                                    Western Kae Empire
                                </option>
                                <option value="Draconic Territories">
                                    Draconic Territories
                                </option>
                                <option value="Draconic Territories">
                                    The Plains of Maddening
                                </option>
                            </select>
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-visited"
                    >
                        <label htmlFor="visited">
                            Visited:
                            <input
                                id="visited"
                                type="checkbox"
                                onChange={() =>
                                    setLocationVisited(!locationVisited)
                                }
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-marked"
                    >
                        <label htmlFor="marked">
                            marked:
                            <input
                                id="marked"
                                type="checkbox"
                                onChange={() =>
                                    setLocationMarked(!locationMarked)
                                }
                            />
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-type"
                    >
                        <label htmlFor="type">
                            Type:
                            <select
                                id="type"
                                placeholder="Select a type"
                                required
                                onChange={({ target }) => {
                                    setLocationType(target.value);
                                }}
                            >
                                <option value="city">City</option>
                                <option value="town">Town</option>
                                <option value="fort">Fort</option>
                                <option value="ruins">Ruins</option>
                                <option value="natural feature">
                                    Natural Feature
                                </option>
                                <option value="dungeon">Dungeon</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                            </select>
                        </label>
                    </div>
                    <div
                        className="creation-input-div"
                        id="create-location-submit"
                    >
                        <button>Submit location!</button>
                    </div>
                </form>
                <button onClick={() => setRenderLocationCreationForm(false)}>
                    Cancel creation
                </button>
            </div>
        </>
    );
};

export default CreateLocationForm;
