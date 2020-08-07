import actionType from "../actions/basic";

const initialState = {
   user: {
       userId: "",
       username: "",
       email: "",
   },
   validToken: true,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.SET_USER : 
            return {
                ...state,
                user: {
                    userId: action.userId,
                    username: action.username,
                    email: action.email
                }
            };
        
        case actionType.SET_VALID_TOKEN : 
            return {
                ...state,
                validToken: action.value
            }

        default:
            return state;
    }
}

export default reducer;