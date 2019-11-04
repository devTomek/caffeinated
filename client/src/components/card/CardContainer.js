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

    const EDIT_USER = gql`
        mutation EditUser($_id: String!, $email: String) {
            editUser(_id: $_id, email: $email) {
                _id
                email
            }
        }
    `;

    const [deleteUser] = useMutation(DELETE_USER);
    const [editUser] = useMutation(EDIT_USER);

    const removeUser = async userId => {
        await deleteUser({
            variables: {
                _id: userId
            }
        });
    };

    const changeUser = async (userId, email) => {
        await editUser({
            variables: {
                _id: userId,
                email
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
                    changeUser={changeUser}
                    userId={user._id}
                />
            ))}
        </div>
    );
};

export default CardContainer;
