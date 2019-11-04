import loadingActions from "./loadingActions";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const login = (token, _id) => dispatch => {
    dispatch({
        type: loadingActions.LOADING,
        loading: true
    });

    dispatch({
        type: LOGIN,
        token,
        _id
    });

    dispatch({
        type: loadingActions.LOADING,
        loading: false
    });
};

const logout = () => dispatch => {
    dispatch({
        type: loadingActions.LOADING,
        loading: true
    });

    dispatch({
        type: LOGOUT
    });

    dispatch({
        type: loadingActions.LOADING,
        loading: false
    });
};

const loginActions = {
    login,
    LOGIN,
    logout,
    LOGOUT
};

export default loginActions;
