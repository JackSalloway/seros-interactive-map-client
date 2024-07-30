import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Sidebar from "./Sidebar";

// FonteAwesome icon imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

test("campaign name renders correctly", async () => {
    // ACT
    render(
        <Sidebar
            campaign={{ name: "Fake Name" }}
            sidebarOpen={true}
            changelog={[]}
            locations={[]}
            quests={[]}
            npcs={[]}
            combatInstances={[]}
        />
    );

    // ARRANGE
    const heading = await screen.findByRole("heading", { level: 2 });

    // ASSERT
    expect(heading).toBeInTheDocument();
});
