import "./JournalMenuHeaderBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JournalMenuHeaderBox = (props) => {
    const {
        selectedTab,
        setSelectedTab,
        headerValue,
        iconValue,
        boxPosition,
        markerBeingEdited,
    } = props;

    const classNames = `journal-front-page-instruction-header-box ${boxPosition}`;

    return (
        <div
            className={classNames}
            onClick={() => {
                if (markerBeingEdited !== null) {
                    alert(
                        "Finish editing your selected location before selecting another tab."
                    );
                    return;
                }
                if (selectedTab === headerValue) {
                    setSelectedTab("Front Page");
                } else {
                    setSelectedTab(headerValue);
                }
            }}
            style={
                selectedTab === headerValue
                    ? {
                          backgroundColor: "rgba(14, 22, 31, 1)",
                          borderBottom: "0px solid black",
                      }
                    : {
                          backgroundColor: "rgba(14, 22, 31, 0.5)",
                          borderBottom: "1px solid black",
                      }
            }
        >
            <h2>{headerValue}</h2>
            <FontAwesomeIcon
                icon={iconValue}
                className="journal-front-page-instruction-header-box-icon"
                style={
                    selectedTab !== headerValue
                        ? { color: "white" }
                        : { color: "green" }
                }
            />
            {/* Removed the tooltip icon for now due to it being buggy, plan to implement it in relevant wrappers at a later date */}
            {/* {selectedTab === headerValue ? (
                <span style={{ position: "absolute", right: 0 }}>
                    <FontAwesomeIcon
                        icon="info-circle"
                        className="journal-fa-icon"
                        id="menu-tab-tooltip-icon"
                    />
                </span>
            ) : null} */}
        </div>
    );
};

export default JournalMenuHeaderBox;
