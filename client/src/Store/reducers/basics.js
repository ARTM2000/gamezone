import actionType from "../actions/basic";

const initialState = {
    socket: {
        on:() => {}
    },
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.SET_SOCKET : 
            return {
                ...state,
                socket: action.socket
            };

        default:
            return state;
    }
}

export default reducer;