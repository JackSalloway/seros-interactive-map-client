import { render, screen, fireEvent } from "@testing-library/react";
import SubLocationWrapper from "../SubLocationWrapper";

// My initial thought was that the mocked functions are not needed as they are within the app,
// However, they do change the values of other props/state when interacted with within the component
// So surely they must be required as they are within the App.
// Or perhaps it is a mix of both, some of the functions change this prop, others do not.

const mockSetShowSubLocations = jest.fn();
const mockSetAddNewSubLocation = jest.fn();

const MockSubLocationWrapper = ({
    mockAddNewSubLocationState,
    mockLocationNotes,
    mockLocations,
    mockShowSubLocationsState,
}) => {
    return (
        <SubLocationWrapper
            addNewSubLocation={mockAddNewSubLocationState} // Boolean that dictate whether the CreateSubLocation component is rendered or not.
            dataNotifications={[]} // Array of message for the user to see when they interact with the app.
            locationNotes={mockLocationNotes} // An object containing the currently selected locations data values.
            serosLocations={mockLocations} // The list of all locations on the map, used to update the selected location without requiring a GET request after creating/updating/deleting a sub-location.
            showSubLocations={mockShowSubLocationsState} // Boolean that dictates whether the Sub-location list is rendered or not.
            setAddNewSubLocation={mockSetAddNewSubLocation} // Function that toggles the addNewSubLocation boolean Value.
            setDataNotifications={jest.fn()} // Function that updates the dataNotifications state value depedning on the action the user took. NOT REQUIRED FOR THIS UNIT TEST
            setDeleteData={jest.fn()} // Function that changes the deleteData state value to the relevant data (in this case a sub-location). NOT REQUIRED FOR THIS UNIT TEST
            setSerosLocations={jest.fn()} // Function to update the maps list of locations depending on the action the user takes. NOT REQUIRED FOR THIS UNIT TEST
            setShowSubLocations={mockSetShowSubLocations} // Function that toggles the showSubLocations boolean value.
        />
    );
};

const fakeLocationNotes = {
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
describe("Header", () => {
    it("Renders correct header", async () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={false}
            />
        );
        const headingElement = screen.getByText(/Sub Locations/i);
        expect(headingElement).toBeInTheDocument();
    });
});

// EXPAND/COLLAPSE CHEVRON ICON
describe("Sub-locations expand/collapse chevron", () => {
    it("Renders expand/collapse chevron span element", async () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={false}
            />
        );
        const expandOrCollapseChevron = screen.getByTestId(
            "expand/collapse sub-locations icon"
        );
        expect(expandOrCollapseChevron).toBeInTheDocument();
    });

    it("Calls setShowSubLocations when up/down chevron icon is clicked", async () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={false}
            />
        );
        const showSubLocationsChevron = screen.getByTestId(
            "expand/collapse sub-locations icon"
        );
        fireEvent.click(showSubLocationsChevron);
        expect(mockSetShowSubLocations).toHaveBeenCalled();
    });

    it("Renders sub-location list depending on mockShowSubLocationsState", async () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={true}
            />
        );
        const subLocationBanner = screen.getByRole("heading", {
            name: "Fake sub-location name",
        });
        expect(subLocationBanner).toBeInTheDocument();
    });

    it("Doesn't render sub-location list depending on mockShowSubLocationsState", async () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={false}
            />
        );
        const subLocationBanner = screen.queryByRole("heading", {
            name: "Fake sub-location name",
        });
        expect(subLocationBanner).not.toBeInTheDocument();
    });
});

// PLUS ICON
describe("Sub-locations add new sub-location icon", () => {
    it("Renders create new sub-locations icon span element(plus icon)", () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={true}
            />
        );

        const addNewSubLocationIcon = screen.getByTestId(
            "add new sub-location icon"
        );
        expect(addNewSubLocationIcon).toBeInTheDocument();
    });

    it("Calls setAddNewSubLocation when plus icon is clicked", () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={true}
            />
        );

        const addNewSubLocationIcon = screen.getByTestId(
            "add new sub-location icon"
        );
        fireEvent.click(addNewSubLocationIcon);
        expect(mockSetAddNewSubLocation).toHaveBeenCalled();
    });

    it("Renders createSubLocation form when mockAddNewSubLocationState is true", () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={true}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={true}
            />
        );

        const newSubLocationFormNameLabel =
            screen.getByLabelText("Sub Location Name:");
        expect(newSubLocationFormNameLabel).toBeInTheDocument();
    });

    it("Doesn't render createSubLocation form when mockAddNewSubLocationState is false", () => {
        render(
            <MockSubLocationWrapper
                mockAddNewSubLocationState={false}
                mockLocationNotes={fakeLocationNotes}
                mockLocations={fakeLocations}
                mockShowSubLocationsState={true}
            />
        );

        const newSubLocationFormNameLabel =
            screen.queryByLabelText("Sub Location Name:");
        expect(newSubLocationFormNameLabel).not.toBeInTheDocument();
    });
});
