import { useState } from "react";

const CreateCombatInstance = (props) => {
    // required inputs fields
    // name: STRING
    // description: STRING
    // combat_details: [
    //     {
    //         player_name: STRING,
    //         player_class: STRING,
    //         turns: {
    //             damage: [NUM],
    //             healing: [NUM],
    //         }
    //     }
    // ]

    // campaignId & locationId will be obtained from state values passed into this component

    const [InstanceName, setInstanceName] = useState("");
    const [InstanceDescritption, setInstanceDescription] = useState("");
    const [instanceDetails, setInstanceDetails] = useState({});

    // Send POST request to create a new Combat Instance at this location

    const postInstanceData = async (e) => {
        e.preventDefault();
    };

    return <div>Adding a new instance...</div>;
};

export default CreateCombatInstance;
