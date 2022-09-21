import React from "react";
import "./JournalMenuHeaderBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JournalMenuHeaderBox = (props) => {
    const {
        selectedTab,
        setSelectedTab,
        headerValue,
        boxPosition,
        showTooltip,
        setShowTooltip,
    } = props;

    const classNames = `journal-front-page-instruction-header-box ${boxPosition}`;

    return (
        <div
            className={classNames}
            onClick={() => {
                if (selectedTab === headerValue) {
                    setSelectedTab("Front Page");
                } else {
                    setSelectedTab(headerValue);
                }
            }}
            style={{
                backgroundColor:
                    selectedTab === headerValue
                        ? "rgba(14, 22, 31, 1)"
                        : "rgba(14, 22, 31, 0.5)",
                borderBottom:
                    selectedTab === headerValue
                        ? "0px solid black  "
                        : "1px solid black",
            }}
        >
            <h2>{headerValue}</h2>
            {selectedTab === headerValue ? (
                <span style={{ position: "absolute", right: 0 }}>
                    <FontAwesomeIcon
                        icon="info-circle"
                        className="journal-fa-icon"
                        id="menu-tab-tooltip-icon"
                        onClick={() => {
                            setShowTooltip(!showTooltip);
                        }}
                    />
                </span>
            ) : null}
        </div>
    );
};

export default JournalMenuHeaderBox;
