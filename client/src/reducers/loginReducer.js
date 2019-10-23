import loginActions from "../actions/loginActions";

const initialState = {
    token: ""
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginActions.LOGIN: {
            return {
                ...state,
                token: action.token
            };
        }
        case loginActions.LOGOUT: {
            return {
                ...state,
                token: ""
            };
        }
        default:
            return state;
    }
};

export const selectToken = state => state.loginReducer.token;

export default loginReducer;
