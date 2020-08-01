import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import { isAuthSelector } from '../../redux/selectors/userSelector';

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,

        '& a': {
            color: '#fff'
        }
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
}));

function Header() {
    const classes = useStyles();
    const isAuth = useSelector(isAuthSelector);

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Chat</Link>
                </Typography>
                {!isAuth ?
                    <>
                        <Button color="inherit">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/registration">Registration</Link>
                        </Button>
                    </> :
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Link to="/profile">
                            <AccountCircle />
                        </Link>
                    </IconButton>
                }

            </Toolbar>
        </AppBar>
    );
}

export default Header;