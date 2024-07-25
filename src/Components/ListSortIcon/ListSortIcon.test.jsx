import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListSortIcon from "./ListSortIcon";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownZA } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDownZA);

const mockSetState = jest.fn();

const renderListSortIcon = (
    name = "arrow-down-z-a",
    value = "revAlphabetical",
    sort = "alphabetical"
) => {
    return render(
        <ListSortIcon
            iconName={name}
            sortValue={value}
            sortBy={sort}
            setSortBy={mockSetState}
        />
    );
};

test("list sort icon renders correctly", async () => {
    // ARRANGE
    renderListSortIcon();

    // ACT
    const sortIcon = screen.getByTestId("list-sort-icon");

    // ASSERT
    expect(sortIcon).toBeInTheDocument();
});

describe("list sort icon on click functionality", () => {
    test("setSortBy function gets called when icon is clicked", async () => {
        // ARRANGE
        renderListSortIcon();

        // ACT
        fireEvent.click(screen.getByTestId("list-sort-icon"));

        // ASSERT
        expect(mockSetState).toHaveBeenCalledTimes(1); // Check the function has been called 1 time
        expect(mockSetState).toHaveBeenCalledWith("revAlphabetical"); // Check the parameter the function was called with
    });

    test("setSortBy function gets called with correct parameter", async () => {
        // ARRANGE
        renderListSortIcon();

        // ACT
        fireEvent.click(screen.getByTestId("list-sort-icon"));

        // ASSERT
        expect(mockSetState).toHaveBeenCalledWith("revAlphabetical"); // Check the function is called with the value of the sortValue prop
    });
});

describe("list sort icon className attribute assignment", () => {
    test("check class attribute is being assigned the right value when icon is not selected", () => {
        // ARRANGE
        renderListSortIcon();

        // ACT
        const sortIcon = screen.getByTestId("list-sort-icon");
        const className = sortIcon.getAttribute("class");

        // ASSERT
        expect(className).not.toContain("list-sort-icon-selected");
    });

    test("check class attribute is being assigned the right value when icon is selected", () => {
        // ARRANGE
        renderListSortIcon(
            "arrow-down-z-a",
            "revAlphabetical",
            "revAlphabetical"
        );

        // ACT
        const sortIcon = screen.getByTestId("list-sort-icon");
        const className = sortIcon.getAttribute("class");

        // ASSERT
        expect(className).toContain("list-sort-icon-selected");
    });
});
