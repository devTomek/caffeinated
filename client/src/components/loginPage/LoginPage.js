import React, { useState } from "react";
import SubmitButton from "../submitButton/SubmitButton";
import { buttonWrapper, loginPage } from "./LoginPage.module.css";
import { makeStyles } from "@material-ui/core/styles";
import EmailPasswordForm from "../emailPasswordForm/EmailPasswordForm";
import utils from "../../utils";
import loginActions from "../../actions/loginActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const mapDispatchToProps = dispatch => ({
    login: (token, _id) => dispatch(loginActions.login(token, _id))
});

const LoginPage = props => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const history = useHistory();

    const useStyles = makeStyles(theme => ({
        container: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column"
        },
        textField: {
            width: "350px"
        }
    }));

    const classes = useStyles();

    const login = async e => {
        e.preventDefault();

        try {
            const requestBody = {
                query: `
                    query {
                        login(email: "${emailValue}", password: "${passwordValue}") {
                            _id
                            token
                        }
                    }
                `
            };
            const response = await fetch(utils.BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            const json = await response.json();
            if (!json.data) {
                return;
            }
            const token = json.data.login.token;
            const _id = json.data.login._id;

            props.login(token, _id);
            localStorage.setItem("jwt", token);
            history.push("/dashboard");
        } catch (e) {
            console.error(e);
        }
    };

    const register = async () => {
        try {
            const requestBody = {
                query: `
                    mutation {
                        createUser(email: "${emailValue}", password: "${passwordValue}") {
                            _id
                            email
                        }
                    }
                `
            };
            await fetch(utils.BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        switch (name) {
            case "email": {
                setEmailValue(value);
                break;
            }
            case "password": {
                setPasswordValue(value);
                break;
            }
            default:
                break;
        }
    };

    return (
        <div className={loginPage} onSubmit={login}>
            <form className={classes.container} noValidate autoComplete="off">
                <EmailPasswordForm
                    onChange={onChange}
                    emailValue={emailValue}
                    passwordValue={passwordValue}
                />
                <div className={buttonWrapper}>
                    <br />
                    <SubmitButton type="submit" text="login" />
                    <br />
                    <SubmitButton onClick={register} text="register" />
                </div>
            </form>
        </div>
    );
};

export default connect(
    null,
    mapDispatchToProps
)(LoginPage);
