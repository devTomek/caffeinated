const LOADING = "LOADING";

const loading = loading => dispatch => {
    dispatch({
        type: LOADING,
        loading
    });
};

const loadingActions = {
    loading,
    LOADING
};

export default loadingActions;
