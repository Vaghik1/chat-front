import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const ChatInput = ({ newMessage, onTextChange, onKeyPress, onMessageSend }) => {
    return (
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
    );
}

export default memo(ChatInput);