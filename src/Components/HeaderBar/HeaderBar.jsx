import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// Style imports
import "./HeaderBar.css";

const HeaderBar = (props) => {
    const { user, location, campaign } = props;

    const navigate = useNavigate();

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
        // Reset values when a user logsout
        // setUserAuthenticated({});
        // setCampaign(null);
        // setSerosLocations(null);
        // setSerosNPCs(null);
        // setSerosQuests(null);
        // setChangelogData(null);
        // setRenderCampaignSettings(null);
        // setRenderCreationMarker(false);
        // setCreationMarkerLatLng([0, 0]);
        // setCreationMarkerType("miscellaneous");
        navigate(0);
    };

    return (
        <div id="header-bar-wrapper">
            <div id="header-bar-title-wrapper">
                <img src="images/SerosLogo2.png" id="header-bar-logo" alt="" />
                <h1>Tactical Journal</h1>
            </div>
            <div id="header-bar-user-wrapper">
                {user.username ? (
                    <h2 id="header-bar-user-greeting">
                        Welcome, {user.username}!
                    </h2>
                ) : null}

                <div id="header-bar-user-buttons">
                    {/* If a campaign is selected, render the return to dashboard icon */}
                    {/* Return to dashboard icon */}
                    {user.username && location.pathname !== "/dashboard" ? (
                        // Dashboard icon
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
                                navigate("/dashboard");
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
                    ) : null}

                    {/* Logout icon */}
                    {user.username ? (
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
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
