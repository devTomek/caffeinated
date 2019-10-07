import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

// todo configure graphQL
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Redirect from="/" to="/auth" exact />
                    <Route path="/auth">
                        <LoginPage />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
