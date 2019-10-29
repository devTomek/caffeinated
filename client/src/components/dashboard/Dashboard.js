import React from "react";
import SubmitButton from "../submitButton/SubmitButton";
import CardContainer from "../card/CardContainer";

const Dashboard = ({ logout, users }) => {
    return (
        <div>
            <CardContainer users={users} />
            <br />
            <SubmitButton text="Logout" onClick={logout} />
        </div>
    );
};

export default Dashboard;
