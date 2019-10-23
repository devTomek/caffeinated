import React from "react";
import SubmitButton from "../submitButton/SubmitButton";

const Dashboard = ({ logout }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <br />
            <SubmitButton text="Logout" onClick={logout} />
        </div>
    );
};

export default Dashboard;
