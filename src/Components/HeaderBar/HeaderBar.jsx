import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// Style imports
import "./HeaderBar.css";

const HeaderBar = (props) => {
    const {
        username,
        setUserAuthenticated,
        setCampaign,
        setSerosLocations,
        setSerosNPCs,
        setSerosQuests,
        setRenderCampaignSettings,
    } = props;

    // User bar buttons styles
    const [logoutHovered, setLogoutHovered] = useState(false);

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
                    <div
                        id="header-bar-user-logout-button"
                        className="header-bar-user-buttons-div"
                        onMouseEnter={() => setLogoutHovered(true)}
                        onMouseLeave={() => setLogoutHovered(false)}
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
                            onClick={() => logout()}
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
