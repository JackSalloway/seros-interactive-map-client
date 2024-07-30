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

describe("sidebar className attribute tests", () => {
    test("sidebar should have 'sidebar-open' class when sidebarOpen value is true", async () => {
        // ARRANGE
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

        // ACT
        const sidebarWrapper = await screen.findByRole("sidebar-wrapper");
        const className = sidebarWrapper.getAttribute("class");

        // ASSERT
        expect(className).toContain("sidebar-open");
    });

    test("sidebar should have 'sidebar-closed' class when sidebarOpen value is false", async () => {
        // ARRANGE
        render(<Sidebar sidebarOpen={false} />);

        // ACT
        const sidebarWrapper = await screen.findByRole("sidebar-wrapper");
        const className = sidebarWrapper.getAttribute("class");

        // ASSERT
        expect(className).toContain("sidebar-closed");
    });
});
