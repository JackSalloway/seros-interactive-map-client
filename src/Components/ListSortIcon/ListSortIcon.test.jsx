import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListSortIcon from "./ListSortIcon";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownZA } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDownZA);

test("setSortBy function gets called with appropriate parameter when icon is clicked", async () => {
    // ARRANGE
    const mockSetState = jest.fn();
    render(
        <ListSortIcon
            iconName={"arrow-down-z-a"}
            sortValue={"revAlphabetical"}
            sortBy={"fakeValue"}
            setSortBy={mockSetState}
        />
    );

    // ACT
    const sortIcon = screen.getByTestId("list-sort-icon");
    fireEvent.click(sortIcon);

    // ASSERT
    expect(mockSetState).toHaveBeenCalledTimes(1); // Check the function has been called 1 time
    expect(mockSetState).toHaveBeenCalledWith("revAlphabetical"); // Check the parameter the function was called with
});

test("check class attribute is being assigned the right value when icon is not selected", () => {
    // ARRANGE
    render(
        <ListSortIcon
            iconName={"arrow-down-z-a"}
            sortValue={"revAlphabetical"}
            sortBy={"alphabetical"}
            setSortBy={jest.fn()}
        />
    );

    // ACT
    const sortIcon = screen.getByTestId("list-sort-icon");
    const className = sortIcon.getAttribute("class");

    // ASSERT
    expect(className).not.toContain("list-sort-icon-selected");
});

test("check class attribute is being assigned the right value when icon is selected", () => {
    // ARRANGE
    render(
        <ListSortIcon
            iconName={"arrow-down-z-a"}
            sortValue={"revAlphabetical"}
            sortBy={"revAlphabetical"}
            setSortBy={jest.fn()}
        />
    );

    // ACT
    const sortIcon = screen.getByTestId("list-sort-icon");
    const className = sortIcon.getAttribute("class");

    // ASSERT
    expect(className).toContain("list-sort-icon-selected");
});
