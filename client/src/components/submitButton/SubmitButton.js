import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SubmitButton = ({ text, type, onClick }) => {
    const useStyles = makeStyles(theme => ({
        button: {
            width: "350px"
        }
    }));
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            type={type}
            variant="contained"
            color="primary"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default SubmitButton;
