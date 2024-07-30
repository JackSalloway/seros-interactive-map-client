import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ChangelogWrapper from "./ChangelogWrapper";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

test("header element renders correctly and its content is the value of the title prop", async () => {
    //ARRANGE
    render(<ChangelogWrapper title={"Fake Title"} changelog={[]} />);

    // ACT
    const heading = await screen.findByRole("heading", { level: 3 });

    // ASSERT
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Fake Title");
});

test("renders the correct amount of changelog items", async () => {
    const mockItem = {
        id: 0,
        user: "",
        created_at: "",
        action: "",
        data_affected: "",
        data_name: "",
    };

    const mockItem2 = {
        id: 1,
        user: "",
        created_at: "",
        action: "",
        data_affected: "",
        data_name: "",
    };

    // ARRANGE
    render(
        <ChangelogWrapper
            title={"Fake Title"}
            changelog={[mockItem, mockItem2]}
        />
    );

    // ACT
    fireEvent.click(screen.getByTestId("item-header-toggle")); // Click event to expand list item dropdown
    const children = await screen.findAllByRole("changelog-item-wrapper");

    // ASSERT
    expect(children.length).toBe(2);
});
