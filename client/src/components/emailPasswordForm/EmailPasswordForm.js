import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const EmailPasswordForm = ({ emailValue, passwordValue, onChange }) => {
    const useStyles = makeStyles(theme => ({
        textField: {
            width: "350px"
        }
    }));
    const classes = useStyles();

    return (
        <>
            <TextField
                id="email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                value={emailValue}
                onChange={onChange}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                name="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value={passwordValue}
                onChange={onChange}
            />
        </>
    );
};

export default EmailPasswordForm;
