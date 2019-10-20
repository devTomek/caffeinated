import loadingActions from "../actions/loadingActions";

const initialState = {
    loading: false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadingActions.LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        default:
            return state;
    }
};

export default loadingReducer;
