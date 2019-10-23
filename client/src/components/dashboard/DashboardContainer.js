import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import loginActions from "../../actions/loginActions";
import { useHistory } from "react-router-dom";

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

    return <Dashboard logout={doLogout} />;
};

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
