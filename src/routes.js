import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from './components/authentication/login';
import Registration from './components/authentication/registration';
import Home from './components/home';

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
        </Switch>
    );
}

export default Routes;