import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import loginActions from "../../actions/loginActions";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(loginActions.logout())
});

const DashboardContainer = ({ logout }) => {
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            history.push("/auth");
        }
    }, [history]);

    const doLogout = () => {
        localStorage.removeItem("jwt");
        logout();
        history.push("/auth");
    };

    const getUsers = gql`
        {
            users {
                _id
                email
            }
        }
    `;

    // todo: attach Auth header, probably in Apollo config
    const { loading, error, data } = useQuery(getUsers);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    console.log(data);
    const users = data.users;

    return <Dashboard logout={doLogout} users={users} />;
};

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
