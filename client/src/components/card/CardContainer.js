import React from "react";
import Card from "./Card";

const CardContainer = ({ users }) => {
    return (
        <div>
            {users.map((user, index) => (
                <Card key={index} user={user} />
            ))}
        </div>
    );
};

export default CardContainer;
