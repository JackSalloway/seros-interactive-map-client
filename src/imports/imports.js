// Header value for requests
export const CONTENT_TYPE_APPLICATION_JSON = "application/json";

// Default style values for react select components
export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        color: state.isSelected ? "red" : "black",
        padding: 20,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        // const transition = "opacity 10000ms";

        return { ...provided, opacity };
    },
};

// Capitalize first letter of each word
export function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
}
