import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const TypingIndicator = ({ isTyping }) => {
    return (
        isTyping ?
            <ListItem>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary="typing..."></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            : null
    );
}

export default memo(TypingIndicator);