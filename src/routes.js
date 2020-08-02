import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from './components/authentication/login';
import Registration from './components/authentication/registration';
import Profile from './components/profile';
import Verify from './components/authentication/verify';
import Home from './components/home';
import Chat from './components/chat';

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/registration">
                <Registration />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/chat">
                <Chat />
            </Route>
            <Route path="/user/verify/:token" children={<Verify />} />
        </Switch>
    );
}

export default Routes;