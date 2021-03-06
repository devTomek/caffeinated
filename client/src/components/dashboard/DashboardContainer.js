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

const DashboardContainer = ({ logout, client }) => {
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            history.push("/auth");
        }
    }, [history]);

    const doLogout = async () => {
        await logout();
        await client.clearStore();
        localStorage.removeItem("jwt");
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

    const { loading, data } = useQuery(getUsers);

    if (loading) return <h1>Loading...</h1>;

    const users = data ? data.users : [];

    return <Dashboard logout={doLogout} users={users} />;
};

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
