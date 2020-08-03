import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import useCallApi from '../../hooks/useCallApi';
import { chatingWithIdSelector, profileSelector } from '../../redux/selectors/userSelector';
import echo from '../../utils/echo';
import Loading from '../../components/common/loading';

const useStyles = makeStyles({
    messageArea: {
        height: '60vh',
        overflowY: 'auto',
        flexDirection: 'column-reverse',
        display: 'flex',
    }
});

const Messages = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { isLoading, apiCaller } = useCallApi();
    const chatingWithId = useSelector(chatingWithIdSelector);
    const profile = useSelector(profileSelector);
    const onMessageSend = useCallback(() => {
        apiCaller(
            'post',
            `chat/${chatingWithId}`,
            {
                message: newMessage
            },
            (response) => {
                setMessages((messages) => {
                    return [
                        {
                            id: uuidv4(),
                            sender_id: profile.id,
                            recipient_id: chatingWithId,
                            message: newMessage,
                            creted_at: moment()
                        },
                        ...messages
                    ]
                });
                setNewMessage('');
            },
            null,
            true,
            { withCredentials: true }
        );
    }, [apiCaller, newMessage, chatingWithId, profile]);
    const onTextChange = useCallback((event) => {
        setNewMessage(event.target.value);
    }, []);
    const onKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            onMessageSend();
        }
    }, [onMessageSend]);

    useEffect(() => {
        if (chatingWithId) {
            setMessages(null);
            apiCaller(
                'get',
                `chat/${chatingWithId}`,
                null,
                (response) => {
                    setMessages(response.data.data.messages);
                },
                null,
                true,
                { withCredentials: true }
            );
        }
    }, [apiCaller, setMessages, chatingWithId]);

    useEffect(() => {
        if (profile) {
            const channel = echo.channel(`App.User.${profile.id}.${chatingWithId}`);
            channel.listen('.MessageSent', (data) => {
                setMessages((messages) => {
                    return [
                        data.message,
                        ...messages
                    ];
                });
            });

            return () => {
                channel.stopListening('.MessageSent');
            }
        }
    }, [profile, setMessages, chatingWithId]);

    return (
        <Grid item xs={9}>
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
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField
                        id="outlined-basic-email"
                        label="Type Something"
                        fullWidth
                        value={newMessage}
                        onChange={onTextChange}
                        onKeyPress={onKeyPress}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab color="primary" aria-label="add" onClick={onMessageSend} >
                        <SendIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Loading open={isLoading} />
        </Grid>
    );
}

export default Messages;