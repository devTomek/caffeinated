import loadingActions from "./loadingActions";

const LOGIN = "LOGIN";

const login = token => async dispatch => {
    await dispatch({
        type: loadingActions.LOADING,
        loading: true
    });

    await dispatch({
        type: LOGIN,
        token
    });

    await dispatch({
        type: loadingActions.LOADING,
        loading: false
    });
};

const loginActions = {
    login,
    LOGIN
};

export default loginActions;
