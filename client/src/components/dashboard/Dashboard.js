import React from "react";
import SubmitButton from "../submitButton/SubmitButton";
import CardContainer from "../card/CardContainer";
import { dashboard } from "./Dashboard.module.css";

const Dashboard = ({ logout, users }) => {
    return (
        <div className={dashboard}>
            <CardContainer users={users} />
            <br />
            <SubmitButton text="Logout" onClick={logout} />
        </div>
    );
};

export default Dashboard;
