import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Pusher from 'pusher-js';

import useCallApi from '../../hooks/useCallApi';
import { chatingWithIdSelector, profileSelector } from '../../redux/selectors/userSelector';
import echoFunc from '../../utils/echo';
import Loading from '../../components/common/loading';
import ChatInput from './chatInput';
import MessagesList from './messagesList';
import TypingIndicator from './typingIndicator';

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
    const [channel, setChannel] = useState();
    const [isTyping, setIsTyping] = useState(false);
    const [isTypingMe, setIsTypingMe] = useState(false);
    const [typingChannel, setTypingChannel] = useState();
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
            () => {
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
        if (!isTypingMe) {
            setIsTypingMe(true);

            setTimeout(() => {
                setIsTypingMe(false);
            }, 3000);

            if (typingChannel) {
                typingChannel.whisper('typing', {
                    userId: chatingWithId
                })
            }
        }
    }, [typingChannel, chatingWithId, isTypingMe, setIsTypingMe]);
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
        if (profile && chatingWithId) {
            window.pusher = Pusher;
            window.pusher.logToConsole = true;
            const echo = echoFunc();
            setChannel(echo.private(`App.User.${profile.id}`));
            setTypingChannel(echo.private(`Chat`));
        }
    }, [profile, chatingWithId, setChannel]);

    useEffect(() => {
        if (channel) {
            channel.listen('.MessageSent', (data) => {
                setMessages([
                    data.message,
                    ...messages
                ]);
            });

            return () => {
                channel.stopListening('.MessageSent');
            }
        }
    }, [channel, setMessages, messages]);

    useEffect(() => {
        if (typingChannel) {
            typingChannel.listenForWhisper('typing', (e) => {
                if (e.userId === profile.id) {
                    if (!isTyping) {
                        setIsTyping(true);
                        setTimeout(() => {
                            setIsTyping(false);
                        }, 3000);
                    }
                }
            })

            return () => {
                typingChannel.stopListeningForWhisper('typing');
            }
        }
    }, [typingChannel, profile, setIsTyping, isTyping])

    return (
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                <TypingIndicator isTyping={isTyping} />
                <MessagesList messages={messages} chatingWithId={chatingWithId} />
            </List>
            <Divider />
            <ChatInput
                newMessage={newMessage}
                onTextChange={onTextChange}
                onKeyPress={onKeyPress}
                onMessageSend={onMessageSend}
            />
            <Loading open={isLoading} />
        </Grid>
    );
}

export default Messages;