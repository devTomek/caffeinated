import React, { useEffect, useState } from "react";
import utils from "./utils";

const LoginPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const query = {
            query: `
                query {
                    users {
                        _id email password
                    }
                }
            `
        };

        // todo refactor
        const res = await fetch(utils.BASE_URL, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Access-Controll-Allow-Origin": "*"
            },
            body: JSON.stringify(query)
        });
        const json = await res.json();
        const users = json.data.users;

        setUsers(users);
    };

    console.log(users);

    return (
        <div>
            <h1>LoginPage</h1>
        </div>
    );
};

export default LoginPage;
