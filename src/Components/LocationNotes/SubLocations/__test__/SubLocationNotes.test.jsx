import { render, screen, fireEvent } from "@testing-library/react";
import SubLocationNotes from "../SubLocationNotes";

const mockSetDataNotifications = jest.fn();
const mockSetDeleteData = jest.fn();
const mockSetSerosLocations = jest.fn();

const MockSubLocationNotes = ({
    mockSubLocation,
    mockLocationNotes,
    mockLocations,
}) => {
    return (
        <SubLocationNotes
            dataNotifications={[]} // Array of message for the user to see when they interact with the app.
            index={0} // Index of the sub-location being mapped over from the locationNotes prop (locationNotes.sub_locations)
            subLocation={mockSubLocation} //
            locationNotes={mockLocationNotes} // The object containing all the data for the current selected location.
            serosLocations={mockLocations} // Array of objects containing all locations on the map.
            setDataNotifications={mockSetDataNotifications} // Function that updates the dataNotifications state value after a location is updated. Used to notify the user of the response from the POST request.
            setDeleteData={mockSetDeleteData} // Function to set the current sub-location as data to be deleted. Causes a deletion modal to be rendered.
            setSerosLocations={mockSetSerosLocations} // Function to update the maps list of locations after a sub-location is updated. Used to update map locations after a successful POST request without using another GET request.
        />
    );
};

const fakeLocations = [
    {
        _id: "fakeId",
        campaign: "fakeCampaignId",
        desc: "Fake location description",
        latlng: { lat: 0, lng: 0 },
        legacy: true,
        marked: true,
        name: "Fake location name",
        region: "Fake region",
        type: "Fake type",
        visited: true,
        sub_locations: [
            {
                _id: "fakeSubLocationId",
                desc: "Fake sub-location description",
                name: "Fake sub-location name",
            },
        ],
    },
];

// HEADER
describe("Sub-location header block", () => {
    it("Renders name of the sub-location being mapped over", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationHeader = screen.getByRole("heading", {
            name: "Fake sub-location name",
        });
        expect(subLocationHeader).toBeInTheDocument();
    });
});

// EXPAND/COLLAPSE CHEVRON ICON
describe("Sub-location notes expand chevron", () => {
    it("Renders expand chevron span element", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        expect(subLocationExpandChevron).toBeInTheDocument();
    });

    it("Renders sub-location notes when expand chevron icon is clicked", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationDescriptionPara = screen.getByText(
            "Fake sub-location description"
        );
        expect(subLocationDescriptionPara).toBeInTheDocument();
    });

    it("Doesn't render sub-location notes when expand chevron icon hasn't been clicked (selected state === false)", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationDescriptionPara = screen.queryByText(
            "Fake sub-location description"
        );
        expect(subLocationDescriptionPara).not.toBeInTheDocument();
    });
});

// EDIT FORM AND RELEVANT ICONS
describe("Sub-location edit form and relevant icons", () => {
    it("Renders sub-location edit form when edit icon is clicked", () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationEditIcon = screen.getByTestId(
            "edit sub-location icon"
        );
        fireEvent.click(subLocationEditIcon);
        const editSubLocationHeader = screen.getByRole("heading", {
            name: "Update: Fake sub-location name",
        });
        expect(editSubLocationHeader).toBeInTheDocument();
    });

    it("Updates values for sub-location name input", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationEditIcon = screen.getByTestId(
            "edit sub-location icon"
        );
        fireEvent.click(subLocationEditIcon);
        const editSubLocationNameInput =
            screen.getByPlaceholderText("Sub-location name");
        fireEvent.change(editSubLocationNameInput, {
            target: { value: "Updated sub-location name" },
        });
        expect(editSubLocationNameInput).toBeInTheDocument();
        expect(editSubLocationNameInput.value).toBe(
            "Updated sub-location name"
        );
    });

    it("Updates values for sub-location description input", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationEditIcon = screen.getByTestId(
            "edit sub-location icon"
        );
        fireEvent.click(subLocationEditIcon);
        const editSubLocationDescriptionInput = screen.getByPlaceholderText(
            "Sub-location description"
        );
        fireEvent.change(editSubLocationDescriptionInput, {
            target: { value: "Updated sub-location description" },
        });
        expect(editSubLocationDescriptionInput).toBeInTheDocument();
        expect(editSubLocationDescriptionInput.value).toBe(
            "Updated sub-location description"
        );
    });

    it("Doesn't render edit sub-location form when the cancel edit icon is clicked", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationEditIcon = screen.getByTestId(
            "edit sub-location icon"
        );
        fireEvent.click(subLocationEditIcon);
        const editSubLocationHeader = screen.queryByRole("heading", {
            name: "Update: Fake sub-location name",
        });
        const cancelSubLocationEditIcon = screen.getByTestId(
            "cancel edit sub-location icon"
        );
        expect(editSubLocationHeader).toBeInTheDocument();
        expect(cancelSubLocationEditIcon).toBeInTheDocument();
        fireEvent.click(cancelSubLocationEditIcon);
        expect(editSubLocationHeader).not.toBeInTheDocument();
    });

    it("Calls relevant functions on edit sub-location form submit", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationEditIcon = screen.getByTestId(
            "edit sub-location icon"
        );
        fireEvent.click(subLocationEditIcon);

        // Query and update sub-location name value
        const editSubLocationNameInput =
            screen.getByPlaceholderText("Sub-location name");
        fireEvent.change(editSubLocationNameInput, {
            target: { value: "Updated sub-location name" },
        });

        // Query and update sub-location description value
        const editSubLocationDescriptionInput = screen.getByPlaceholderText(
            "Sub-location description"
        );
        fireEvent.change(editSubLocationDescriptionInput, {
            target: { value: "Updated sub-location description" },
        });
        const editSubLocationFormSubmitButton = screen.queryByRole("button", {
            name: "Update Sub Location!",
        });
        expect(editSubLocationFormSubmitButton).toBeInTheDocument();
        // Click submit button
        fireEvent.click(editSubLocationFormSubmitButton);
        // Update map location values
        // TEST FAILS ON THE FOLLOWING LINE - I assume this is down to the POST request not having been mocked.
        expect(mockSetSerosLocations).toHaveBeenCalled();
        // Update notification values
        expect(mockSetDataNotifications).toHaveBeenCalled();
        // Change editing state of current sub-location causing it to de-render
        expect(editSubLocationFormSubmitButton).not.toBeInTheDocument();
    });
    // Need to test the following on edit form submission
    // setSerosLocations is called.
    // setDataNotifications is called.
    // Sub-location edit form is no longer rendered after successful POST request.
});

// DELETE ICON
describe("Sub-location delete icon", () => {
    it("Calls setDeleteData when sub-location delete icon is clicked", async () => {
        render(
            <MockSubLocationNotes
                mockLocations={fakeLocations}
                mockLocationNotes={fakeLocations[0]}
                mockSubLocation={fakeLocations[0].sub_locations[0]}
            />
        );
        const subLocationExpandChevron = screen.getByTestId(
            "expand sub-location icon"
        );
        fireEvent.click(subLocationExpandChevron);
        const subLocationDeleteIcon = screen.getByTestId(
            "delete sub-location icon"
        );
        expect(subLocationDeleteIcon).toBeInTheDocument();
        fireEvent.click(subLocationDeleteIcon);
        expect(mockSetDeleteData).toHaveBeenCalled();
    });
});
