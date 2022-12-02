import { render, screen, fireEvent } from "@testing-library/react";
import CreateSubLocation from "../CreateSubLocation";

const mockSetAddNewSubLocation = jest.fn();
const mockSetDataNotifications = jest.fn();
const mockSetSerosLocations = jest.fn();

const MockCreateSubLocation = () =>
    // {
    // mockLocationNotes,
    // mockLocations,
    // }
    {
        return (
            <CreateSubLocation
                dataNotifications={[]} // Array of message for the user to see when they interact with the app.
                locationNotes={{}} // An object containing the currently selected locations data values. Used in this component to identify the location after the POST request is fired.
                serosLocations={[]} // The list of all locations on the map, used to update the selected location without requiring a GET request after creating/updating/deleting a sub-location.
                setAddNewSubLocation={mockSetAddNewSubLocation} // Function that toggles the addNewSubLocation boolean Value. Used in this component to de-render the form after a successful POST request.
                setDataNotifications={mockSetDataNotifications} // Function that updates the dataNotifications state value after a new sub-location is created. Used to notify the user of the response from the POST request.
                setSerosLocations={mockSetSerosLocations} // Function to update the maps list of locations after a new sub-location is created. Used to update map locations after a successful POST request without using another GET request.
            />
        );
    };

describe("Sub-location name input", () => {
    it("Changes value of sub-location name input onChange (typing)", async () => {
        render(<MockCreateSubLocation />);
        const subLocationNameInput =
            screen.getByLabelText("Sub Location Name:");
        fireEvent.change(subLocationNameInput, {
            target: { value: "New sub-location name" },
        });
        expect(subLocationNameInput.value).toBe("New sub-location name");
    });
});

describe("Sub-location description input", () => {
    it("Changes value of sub-location description input onChange (typing)", async () => {
        render(<MockCreateSubLocation />);
        const subLocationDescriptionInput = screen.getByLabelText(
            "Sub Location Description:"
        );
        fireEvent.change(subLocationDescriptionInput, {
            target: { value: "New sub-location description" },
        });
        expect(subLocationDescriptionInput.value).toBe(
            "New sub-location description"
        );
    });
});

// Need to create a test that covers the submit button - for this I need to mock the POST request as I don't want it to interact with the backend.
// Not entirely sure how to mock this as of yet, but will get around to it.

// The button needs to test if the following functions are called :
// setAddNewSubLocation
// setDataNotifications
// setSerosLocations
