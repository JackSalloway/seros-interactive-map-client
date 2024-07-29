import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ChangelogItem from "./ChangelogItem";
import dayjs from "dayjs";

// user, created_at, action, data_affected, data_name
// Create fake item
const mockItem = {
    user: "user",
    created_at: new Date().toISOString(),
    action: "action",
    data_affected: "data affected:",
    data_name: "data name",
};

test("ChangelogItem renders header div and it's text content renders correctly", async () => {
    // ARRANGE
    render(<ChangelogItem item={mockItem} />);

    // ACT
    const headerDiv = await screen.findByRole("changelog-item-header");
    const expectedText = `${mockItem.user} ${dayjs(mockItem.created_at).format(
        "DD/MM/YYYY"
    )} at ${dayjs(mockItem.created_at).format("HH:mm:ss")}`;

    // ASSERT
    expect(headerDiv).toBeInTheDocument();
    expect(headerDiv).toHaveTextContent(expectedText);
});

test("ChangelogItem renders content div and it's text content renders correctly", async () => {
    // ARRANGE
    render(<ChangelogItem item={mockItem} />);

    // ACT
    const contentDiv = await screen.findByRole("changelog-item-content");
    const expectedText = `${mockItem.action} ${mockItem.data_affected}: ${mockItem.data_name}`;

    // ASSERT
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveTextContent(expectedText);
});
