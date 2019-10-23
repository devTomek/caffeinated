import loadingActions from "./loadingActions";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const login = token => dispatch => {
    dispatch({
        type: loadingActions.LOADING,
        loading: true
    });

    dispatch({
        type: LOGIN,
        token
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
