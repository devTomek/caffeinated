import React from "react";
import Card from "./Card";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CardContainer = ({ users }) => {
    const DELETE_USER = gql`
        mutation DeleteUser($_id: String!) {
            deleteUser(_id: $_id) {
                _id
            }
        }
    `;

    const [deleteUser] = useMutation(DELETE_USER);

    const removeUser = async userId => {
        await deleteUser({
            variables: {
                _id: userId
            }
        });
    };

    return (
        <div>
            {users.map((user, index) => (
                <Card
                    key={index}
                    user={user}
                    removeUser={removeUser}
                    userId={user._id}
                />
            ))}
        </div>
    );
};

export default CardContainer;
