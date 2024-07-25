import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";
import dayjs from "dayjs";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

describe("ListItem renders data correctly", () => {
    test("list item name is displayed on render", async () => {
        //ARRANGE
        render(
            <ListItem
                id={0}
                name={"Nook of the North"}
                description={"Fake Description"}
            />
        );

        // ACT
        await screen.findByRole("item-header-name");

        // ASSERT
        // Check header name value is rendering correctly
        expect(screen.getByRole("item-header-name")).toHaveTextContent(
            "Nook of the North"
        );
    });

    test("list item displays more content when toggle chevron is clicked", async () => {
        // ARRANGE
        const currentTime = new Date().toISOString();
        render(
            <ListItem
                id={0}
                name={"Nook of the North"}
                description={"Fake Description"}
                coords={{ lat: 0, lng: 0 }}
                updated_at={currentTime}
            />
        );

        // ACT
        // Fire click event to expand list item dropdown
        fireEvent.click(screen.getByTestId("item-header-toggle"));
        await screen.findByRole("item-content-description");
        await screen.findByRole("item-content-updated_at");

        // ASSERT
        // Check description is rendering correctly
        expect(
            await screen.findByRole("item-content-description")
        ).toHaveTextContent("Fake Description");

        // Check updated at value is rendering correctly
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
        render(
            <ListItem
                id={0}
                name={"Nook of the North"}
                description={"Fake Description"}
                coords={mockCoordsArray}
                updated_at={"Fake Time"}
            />
        );

        //ACT
        fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for both objects in the coords array
        const items = screen.getAllByRole("button", {
            name: "Jump to location!",
        }); // Retrieve array of buttons rendered for jumping to locations on the map

        //ASSERT
        expect(items.length).toBe(mockCoordsArray.length);
    });
});

describe("ListItem jump to location button functionality", () => {
    // Fire click event to expand list item dropdown and click jump to location button
    const mockJumpToLocation = async () => {
        fireEvent.click(screen.getByTestId("item-header-toggle"));
        fireEvent.click(await screen.findByText("Jump to location!"));
    };

    test("jump to location button renders and calls flyTo function in ref.current object when ref.current._zoom value is 5 ", async () => {
        // ARRANGE
        const mockRef = {
            current: {
                getZoom: jest.fn(() => {
                    return 5; // Simulates getting the _zoom value from the ref.current object
                }),
                flyTo: jest.fn(),
            },
        };

        render(
            <ListItem
                id={0}
                name={"Nook of the North"}
                description={"Fake Description"}
                coords={{ lat: 0, lng: 0 }}
                mapRef={mockRef}
                updated_at={"Fake Time"}
            />
        );

        // ACT
        await mockJumpToLocation();

        // ASSERT
        expect(mockRef.current.getZoom).toHaveBeenCalledTimes(1);
        expect(mockRef.current.flyTo).toHaveBeenCalledTimes(1);
    });

    test("jump to location button renders and calls setView function in ref.current object when ref.current._zoom value is < 5 ", async () => {
        // ARRANGE
        const mockRef = {
            current: {
                getZoom: jest.fn(() => {
                    return 2; // Simulates getting the _zoom value from the ref.current object
                }),
                setView: jest.fn(),
            },
        };

        render(
            <ListItem
                id={0}
                name={"Nook of the North"}
                description={"Fake Description"}
                coords={{ lat: 0, lng: 0 }}
                mapRef={mockRef}
                updated_at={"Fake Time"}
            />
        );

        // ACT
        await mockJumpToLocation();

        // ASSERT
        expect(mockRef.current.getZoom).toHaveBeenCalledTimes(1);
        expect(mockRef.current.setView).toHaveBeenCalledTimes(1);
    });
});
