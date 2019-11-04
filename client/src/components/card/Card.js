import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Card = ({ user, removeUser, userId }) => {
    const [dense] = React.useState(false);
    const [secondary] = React.useState(false);

    const deleteUser = () => removeUser(userId);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{ width: "40vw" }}>
                    <div>
                        <List dense={dense}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.email}
                                    secondary={
                                        secondary ? "Secondary text" : null
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={deleteUser}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete">
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Card;
