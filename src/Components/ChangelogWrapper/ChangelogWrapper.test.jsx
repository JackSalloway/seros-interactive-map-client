import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
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
