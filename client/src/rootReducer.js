import { combineReducers } from "redux";
import loadingReducer from "./reducers/loadingReducer";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
    loadingReducer,
    loginReducer
});

export default rootReducer;
