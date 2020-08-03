import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import { setUsers, setChatingWithId } from '../../redux/modules/users';
import useCallApi from '../../hooks/useCallApi';
import { usersSelector, chatingWithIdSelector } from '../../redux/selectors/userSelector';
import Loading from '../../components/common/loading';

const useStyles = makeStyles({
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
        maxHeight: '100%'
    },
});

const ChatUsersList = () => {
    const classes = useStyles();
    const { isLoading, apiCaller } = useCallApi();
    const dispatch = useDispatch();
    const dispatchSetProfile = useCallback(
        (response) => dispatch(setUsers(response)),
        [dispatch]
    );
    const dispatchsetChatingWithId = useCallback(
        (response) => dispatch(setChatingWithId(response)),
        [dispatch]
    );
    const selectUser = useCallback((id) => {
        dispatchsetChatingWithId(id);
    }, [dispatchsetChatingWithId]);
    const users = useSelector(usersSelector);
    const chatingWithId = useSelector(chatingWithIdSelector);

    useEffect(() => {
        apiCaller('get', 'users', null, (response) => {
            dispatchSetProfile(response.data.data);
            selectUser(response.data.data[0].id);
        }, null, true, { withCredentials: true });
    }, [apiCaller, dispatchSetProfile, selectUser]);

    return (
        <Grid item xs={3} className={classes.borderRight500}>
            <List>
                {
                    users && users.length && users.map((user, index) => {
                        const { id, name } = user;

                        return (
                            <ListItem button key={id} onClick={selectUser.bind(null, id)} selected={id === chatingWithId}>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={`https://material-ui.com/static/images/avatar/${index + 1}.jpg`} />
                                </ListItemIcon>
                                <ListItemText primary={name}></ListItemText>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Loading open={isLoading} />
        </Grid>
    );
}

export default ChatUsersList;