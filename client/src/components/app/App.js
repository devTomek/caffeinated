import React from "react";
import store from "../../store";
import { Provider } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import DashboardContainer from "../dashboard/DashboardContainer";

const App = () => {
    const client = new ApolloClient({
        request: operation => {
            const token = localStorage.getItem("jwt");
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ""
                }
            });
        }
    });

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Redirect from="/" to="/auth" exact />
                        <Route path="/auth">
                            <LoginPage />
                        </Route>
                        <Route path="/dashboard">
                            <DashboardContainer client={client} />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </ApolloProvider>
    );
};

export default App;
