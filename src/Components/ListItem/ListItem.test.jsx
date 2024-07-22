import React, { useRef } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";
import dayjs from "dayjs";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

test("list item name is displayed on render", async () => {
    //ARRANGE
    // const mockRef = { current: null };
    // const ref = useRef(mockRef);
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

    // ASSERT
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

    // Fire click event to expand list item dropdown and click jump to location button
    fireEvent.click(screen.getByTestId("item-header-toggle"));
    fireEvent.click(await screen.findByText("Jump to location!"));

    // ACT
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

    // ASSERT
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

    // Fire click event to expand list item dropdown and click jump to location button
    fireEvent.click(screen.getByTestId("item-header-toggle"));
    fireEvent.click(await screen.findByText("Jump to location!"));

    // ACT
    expect(mockRef.current.getZoom).toHaveBeenCalledTimes(1);
    expect(mockRef.current.setView).toHaveBeenCalledTimes(1);
});
