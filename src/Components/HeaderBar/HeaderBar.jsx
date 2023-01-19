import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// Style imports
import "./HeaderBar.css";

const HeaderBar = (props) => {
    const {
        username,
        setUserAuthenticated,
        campaign,
        setCampaign,
        setSerosLocations,
        setSerosNPCs,
        setSerosQuests,
        setChangelogData,
        setRenderCampaignSettings,
    } = props;

    // User bar buttons styles
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [returnToDashboardHovered, setReturnToDashboardHovered] =
        useState(false);

    // User logout function
    const logout = async () => {
        await axios({
            method: "get",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/logout`,
        });
        // Set value to true
        setUserAuthenticated({});
        setCampaign(null);
        setSerosLocations(null);
        setSerosNPCs(null);
        setSerosQuests(null);
        setChangelogData(null);
        setRenderCampaignSettings(null);
    };

    return (
        <div id="header-bar-wrapper">
            <div id="header-bar-title-wrapper">
                <img src="images/SerosLogo2.png" id="header-bar-logo" alt="" />
                <h1>Seros Project</h1>
            </div>
            <div id="header-bar-user-wrapper">
                <h2 id="header-bar-user-greeting">Welcome, {username}!</h2>
                <div id="header-bar-user-buttons">
                    {/* If a campaign is selected, render the return to dashboard icon */}
                    {/* Return to dashboard icon */}
                    {campaign === null ? null : (
                        <div
                            id="header-bar-user-return-to-dashboard-button"
                            className="header-bar-user-buttons-div"
                            onMouseEnter={() =>
                                setReturnToDashboardHovered(true)
                            }
                            onMouseLeave={() =>
                                setReturnToDashboardHovered(false)
                            }
                            onClick={() => {
                                setReturnToDashboardHovered(false); // Added this line as the return to dashboard icon retained its green color for some reason
                                setCampaign(null);
                                setSerosLocations(null);
                                setSerosNPCs(null);
                                setSerosQuests(null);
                                setChangelogData(null);
                                setRenderCampaignSettings(null);
                            }}
                        >
                            Return to Dashboard
                            <FontAwesomeIcon
                                icon="house-user"
                                className="header-bar-user-icon"
                                style={
                                    returnToDashboardHovered === false
                                        ? { color: "white" }
                                        : { color: "green" }
                                }
                            />
                        </div>
                    )}

                    {/* Logout icon */}
                    <div
                        id="header-bar-user-logout-button"
                        className="header-bar-user-buttons-div"
                        onMouseEnter={() => setLogoutHovered(true)}
                        onMouseLeave={() => setLogoutHovered(false)}
                        onClick={() => logout()}
                    >
                        Logout
                        <FontAwesomeIcon
                            icon="right-from-bracket"
                            className="header-bar-user-icon"
                            style={
                                logoutHovered === false
                                    ? { color: "white" }
                                    : { color: "red" }
                            }
                        />
                    </div>
                </div>

                {/* {showUserDropdown === false ? (
                    <FontAwesomeIcon
                        icon="chevron-down"
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon="chevron-up"
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                    />
                )} */}
            </div>
        </div>
    );
};

export default HeaderBar;
