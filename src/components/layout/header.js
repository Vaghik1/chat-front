import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Chat</Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/registration">Registration</Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;