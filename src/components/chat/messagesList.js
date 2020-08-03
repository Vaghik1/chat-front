import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

const useStyles = makeStyles({
    messageArea: {
        height: '60vh',
        overflowY: 'auto',
        flexDirection: 'column-reverse',
        display: 'flex',
    }
});

const MessagesList = ({ messages, chatingWithId }) => {
    const classes = useStyles();

    return (
        <List className={classes.messageArea}>
            {
                messages && !!messages.length && messages.map(messageData => {
                    const { message, recipient_id, created_at, id } = messageData;
                    const align = chatingWithId === recipient_id ? 'left' : 'Right  ';

                    return (
                        <ListItem key={id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={align} primary={message}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={align} secondary={moment(created_at).format('lll')}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                })
            }
        </List>
    );
}

export default memo(MessagesList);