import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from './components/common/protected-route';
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
            <ProtectedRoute path="/login" component={Login} isAuth={false} />
            <ProtectedRoute path="/registration" component={Registration} isAuth={false} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/chat" component={Chat} />
            <Route path="/user/verify/:token" children={<Verify />} />
        </Switch>
    );
}

export default Routes;