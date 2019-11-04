import loginActions from "../actions/loginActions";

const initialState = {
    token: "",
    _id: ""
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginActions.LOGIN: {
            return {
                ...state,
                token: action.token,
                _id: action._id
            };
        }
        case loginActions.LOGOUT: {
            return {
                ...state,
                token: "",
                _id: ""
            };
        }
        default:
            return state;
    }
};

export const selectToken = state => state.loginReducer.token;

export const selectId = state => state.loginReducer._id;

export default loginReducer;
