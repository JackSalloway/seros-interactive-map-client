import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";
import dayjs from "dayjs";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

// Render ListItem component with default values
const renderListItem = (
    time = "Fake time",
    coords = { lat: 0, lng: 0 },
    ref = {}
) => {
    return render(
        <ListItem
            id={0}
            name={"Nook of the North"}
            description={"Fake description"}
            updated_at={time}
            coords={coords}
            mapRef={ref}
        />
    );
};

// Click event to expand list item dropdown
const expandList = () => {
    fireEvent.click(screen.getByTestId("item-header-toggle"));
};

describe("ListItem renders data correctly", () => {
    test("list item displays name value correctly", async () => {
        //ARRANGE
        renderListItem();

        // ACT
        await screen.findByRole("item-header-name");

        // ASSERT
        expect(screen.getByRole("item-header-name")).toHaveTextContent(
            "Nook of the North"
        );
    });

    test("list item displays description value correctly", async () => {
        // ARRANGE
        renderListItem();

        // ACT
        expandList();

        //ASSERT
        expect(
            await screen.findByRole("item-content-description")
        ).toHaveTextContent("Fake description");
    });

    test("list item displays updated at value correctly", async () => {
        // ARRANGE
        const currentTime = new Date().toISOString();
        renderListItem(currentTime);

        // ACT
        expandList();

        // ASSERT
        const expectedDateString = `Last updated: ${dayjs(currentTime).format(
            "DD/MM/YYYY"
        )} at ${dayjs(currentTime).format("HH:mm:ss")}`;
        expect(
            await screen.findByRole("item-content-updated_at")
        ).toHaveTextContent(expectedDateString);
    });

    test("component renders out multiple locations when coords parameter is an array of coords", () => {
        // ARRANGE
        const mockCoordsArray = [
            { id: 0, latlng: { lat: 0, lng: 0 }, name: "Fake Location 1" },
            { id: 1, latlng: { lat: 1, lng: 1 }, name: "Fake Location 2" },
        ];
        renderListItem("Fake time", mockCoordsArray);

        //ACT

        expandList();
        // Retrieve array of buttons rendered for jumping to locations on the map
        const items = screen.getAllByRole("button", {
            name: "Jump to location!",
        });

        //ASSERT
        expect(items.length).toBe(mockCoordsArray.length);
    });
});

describe("ListItem jump to location button functionality", () => {
    test("button renders correctly", async () => {
        // ARRANGE
        renderListItem();

        // ACT
        expandList();
        const jumpToLocationButton = await screen.findByText(
            "Jump to location!"
        );

        // ASSERT
        expect(jumpToLocationButton).toBeInTheDocument();
    });

    describe("jump to location button functionality", () => {
        // Click event to simulate clicking the jump to location button
        const mockJumpToLocation = async () => {
            fireEvent.click(await screen.findByText("Jump to location!"));
        };

        test("jump to location button calls flyTo function in ref.current object when ref.current._zoom value is 5 ", async () => {
            // ARRANGE
            const mockRef = {
                current: {
                    getZoom: jest.fn(() => {
                        return 5; // Simulates getting the _zoom value from the ref.current object
                    }),
                    flyTo: jest.fn(),
                },
            };
            renderListItem("Fake time", { lat: 0, lng: 0 }, mockRef);

            // ACT
            expandList();
            await mockJumpToLocation();

            // ASSERT
            expect(mockRef.current.getZoom).toHaveBeenCalledTimes(1);
            expect(mockRef.current.flyTo).toHaveBeenCalledTimes(1);
        });

        test("jump to location button calls setView function in ref.current object when ref.current._zoom value is < 5 ", async () => {
            // ARRANGE
            const mockRef = {
                current: {
                    getZoom: jest.fn(() => {
                        return 2; // Simulates getting the _zoom value from the ref.current object
                    }),
                    setView: jest.fn(),
                },
            };
            renderListItem("Fake time", { lat: 0, lng: 0 }, mockRef);

            // ACT
            expandList();
            await mockJumpToLocation();

            // ASSERT
            expect(mockRef.current.getZoom).toHaveBeenCalledTimes(1);
            expect(mockRef.current.setView).toHaveBeenCalledTimes(1);
        });
    });
});
