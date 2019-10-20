import loginActions from "../actions/loginActions";

const initialState = {};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginActions.LOGIN: {
            return {
                ...state,
                token: action.token
            };
        }
        default:
            return state;
    }
};

export default loginReducer;
