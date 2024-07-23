import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListSortIcon from "./ListSortIcon";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownZA } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDownZA);

test("setSortBy function gets called and appropriate state value is changed on click", async () => {
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
    fireEvent.click(screen.getByTestId("list-sort-icon"));

    // ASSERT
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith("revAlphabetical");
});
