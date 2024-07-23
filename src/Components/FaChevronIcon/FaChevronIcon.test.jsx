import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import FaChevronIcon from "./FaChevronIcon";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

test("toggleOpen function is called on icon click and its parameter is the inverse of the open prop value", () => {
    // ARRANGE
    const mockStateValue = false;
    const mockSetState = jest.fn();
    render(<FaChevronIcon open={mockStateValue} toggleOpen={mockSetState} />);

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle"));

    // ASSERT
    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(!mockStateValue);
});
