import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ListFilter from "./ListFilter";

test("function is called when user edits input field", async () => {
    // ARRANGE
    const test = jest.fn();
    render(<ListFilter setFilterString={test} />);
    const inputField = screen.getByPlaceholderText(
        "Enter a search query to filter the list"
    );

    // ACT
    fireEvent.change(inputField, { target: { value: "test" } });

    // ASSERT
    expect(inputField.value).toBe("test"); // Check the value of the input has changed
    expect(test).toHaveBeenCalledTimes(1); // Check the relevant function has been called
});
