import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListWrapper from "./ListWrapper";

// FonteAwesome icon imports - More needed that other tests due to the 4 filter icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronDown,
    faArrowDownAZ,
    faArrowDownZA,
    faHourglassStart,
    faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faChevronDown,
    faArrowDownAZ,
    faArrowDownZA,
    faHourglassStart,
    faHourglassEnd
);

test("list wrapper header renders correctly", async () => {
    //ARRANGE
    render(<ListWrapper title={"Locations"} list={[]} />);

    // ACT
    const heading = await screen.findByRole("heading", { level: 3 });

    // ASSERT
    expect(heading).toHaveTextContent("Locations"); // Check header name value is rendering correctly
});

test("all sort icons render correctly", async () => {
    // ARRANGE
    render(<ListWrapper title={"locations"} list={[]} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    const sortIcons = await screen.findAllByTestId("list-sort-icon"); // Find all list sort icons

    // ASSERT
    expect(sortIcons.length).toBe(4);
});

test("list is filtered on render by orderAlphabetically function ", () => {
    // ARRANGE
    const listItems = [
        { id: 1, name: "B item", description: "B description" },
        { id: 2, name: "C item", description: "C description" },
        { id: 3, name: "A item", description: "A description" },
    ];
    render(<ListWrapper title={"locations"} list={listItems} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    const renderedItems = screen.getAllByRole("item-header-name");

    // ASSERT
    expect(renderedItems[0]).toHaveTextContent("A item");
    expect(renderedItems[1]).toHaveTextContent("B item");
    expect(renderedItems[2]).toHaveTextContent("C item");
});

test("sort alphabetically functionality works with multiple items that share the exact same sort value  ", () => {
    // ARRANGE
    const listItems = [
        { id: 1, name: "B item", description: "B description" },
        { id: 2, name: "A item", description: "A description" },
        { id: 3, name: "A item", description: "A description" },
    ];
    render(<ListWrapper title={"locations"} list={listItems} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    const renderedItems = screen.getAllByRole("item-header-name");

    // ASSERT
    expect(renderedItems[0]).toHaveTextContent("A item");
    expect(renderedItems[1]).toHaveTextContent("A item");
    expect(renderedItems[2]).toHaveTextContent("B item");
});

test("list is filtered reverse alphabetical after z-a icon is clicked", () => {
    // ARRANGE
    const listItems = [
        { id: 1, name: "B item", description: "B description" },
        { id: 2, name: "C item", description: "C description" },
        { id: 3, name: "A item", description: "A description" },
    ];
    render(<ListWrapper title={"locations"} list={listItems} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    fireEvent.click(screen.getByTitle("arrow-down-z-a")); // Simulate click on the Z-A sort icon
    const renderedItems = screen.getAllByRole("item-header-name");

    // ASSERT
    expect(renderedItems[0]).toHaveTextContent("C item");
    expect(renderedItems[1]).toHaveTextContent("B item");
    expect(renderedItems[2]).toHaveTextContent("A item");
});

test("list is filtered in chronological order after hourglass start icon is clicked", () => {
    // ARRANGE
    const listItems = [
        {
            id: 1,
            name: "B item",
            description: "B description",
            updated_at: "2024-07-23T12:27:14.000Z",
        },
        {
            id: 2,
            name: "C item",
            description: "C description",
            updated_at: "2024-07-23T12:47:14.000Z",
        },
        {
            id: 3,
            name: "A item",
            description: "A description",
            updated_at: "2024-07-23T12:37:14.000Z",
        },
    ];
    render(<ListWrapper title={"locations"} list={listItems} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    fireEvent.click(screen.getByTitle("hourglass-start")); // Simulate click on the hourglass-start sort icon (not really many good icons for ordering in chronological order)
    const renderedItems = screen.getAllByRole("item-header-name");

    // ASSERT
    expect(renderedItems[0]).toHaveTextContent("B item");
    expect(renderedItems[1]).toHaveTextContent("A item");
    expect(renderedItems[2]).toHaveTextContent("C item");
});

test("list is filtered in reverse chronological order after hourglass end icon is clicked", () => {
    // ARRANGE
    const listItems = [
        {
            id: 1,
            name: "B item",
            description: "B description",
            updated_at: "2024-07-23T12:27:14.000Z",
        },
        {
            id: 2,
            name: "C item",
            description: "C description",
            updated_at: "2024-07-23T12:47:14.000Z",
        },
        {
            id: 3,
            name: "A item",
            description: "A description",
            updated_at: "2024-07-23T12:37:14.000Z",
        },
    ];
    render(<ListWrapper title={"locations"} list={listItems} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click the toggle icon for the ListWrapper component
    fireEvent.click(screen.getByTitle("hourglass-end")); // Simulate click on the hourglass-end sort icon (not really many good icons for ordering in chronological order)
    const renderedItems = screen.getAllByRole("item-header-name");

    // ASSERT
    expect(renderedItems[0]).toHaveTextContent("C item");
    expect(renderedItems[1]).toHaveTextContent("A item");
    expect(renderedItems[2]).toHaveTextContent("B item");
});
