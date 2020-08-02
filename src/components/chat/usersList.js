import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import { setUsers } from '../../redux/modules/users';
import useCallApi from '../../hooks/useCallApi';
import { usersSelector } from '../../redux/selectors/userSelector';

const useStyles = makeStyles({
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
        maxHeight: '100%'
    },
});

const ChatUsersList = () => {
    const classes = useStyles();
    const { apiCaller } = useCallApi();
    const dispatch = useDispatch();
    const dispatchSetProfile = useCallback(
        (response) => dispatch(setUsers(response)),
        [dispatch]
    );
    const users = useSelector(usersSelector);

    useEffect(() => {
        apiCaller('get', 'users', null, (response) => {
            dispatchSetProfile(response.data.data);
        }, null, true, { withCredentials: true });
    }, [apiCaller, dispatchSetProfile]);

    return (
        <Grid item xs={3} className={classes.borderRight500}>
            <List>
                <ListItem button key="RemySharp">
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="John Wick"></ListItemText>
                </ListItem>
                <ListItem button key="RemySharp">
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                </ListItem>
                <ListItem button key="Alice">
                    <ListItemIcon>
                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Alice">Alice</ListItemText>
                </ListItem>
                <ListItem button key="CindyBaker">
                    <ListItemIcon>
                        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                </ListItem>
            </List>
        </Grid>
    );
}

export default ChatUsersList;