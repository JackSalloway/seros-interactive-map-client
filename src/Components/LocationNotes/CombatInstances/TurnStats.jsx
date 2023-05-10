const TurnStats = (props) => {
    const {
        turns,
        setTurns,
        instancePlayerDetails,
        setInstancePlayerDetails,
        postInstanceData,
    } = props;

    // Need to loop over each instance of turns and render two sets of inputs for each player (damage & healing)
    // All inputs should have a default value of 0
    // There should be a button that allows the user to add turns
    // There should be a button that allows the user to remove turns
    // Users should be able to cycle through turns
    // There should be a submit button that sends the post request to the server

    return <div>Turn stats!</div>;
};

export default TurnStats;
