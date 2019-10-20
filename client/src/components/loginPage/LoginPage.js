import React from "react";
import EmailPasswordForm from "../emailPasswordForm/EmailPasswordForm";
import SubmitButton from "../submitButton/SubmitButton";
import { buttonWrapper, loginPage } from "./LoginPage.module.css";
import { makeStyles } from "@material-ui/core/styles";

const LoginPage = () => {
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
    return (
        <div className={loginPage}>
            <form className={classes.container} noValidate autoComplete="off">
                <EmailPasswordForm />
                <div className={buttonWrapper}>
                    <br />
                    <SubmitButton text="login" />
                    <br />
                    <SubmitButton text="register" />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
