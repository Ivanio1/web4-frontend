const defaultState = {
    x: "",
    y: "",
    r: "4",
    errorStateX: "",
    errorStateY: "",
    errorStateR: ""

}


export const pointReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "X_CHANGE":
            return {...state, x: action.payload, errorStateX: action.payload >= -5 && action.payload <= 5 ? "" : "error"}
        case "Y_CHANGE":
            return {...state, y: action.payload, errorStateY: action.payload >= -5 && action.payload <= 3 ? "" : "error"}
        case "R_CHANGE":
            return {...state, r: action.payload, errorStateR: action.payload > 0 && action.payload <= 5 ? "" : "error"}
        default:
            return state;
    }
}