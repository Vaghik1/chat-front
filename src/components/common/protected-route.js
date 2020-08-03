import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isAuthSelector } from '../../redux/selectors/userSelector';

function ProtectedRoute({ component, isAuth = true }) {
    const Component = component;
    const isAuthenticated = useSelector(isAuthSelector);

    if (isAuthenticated === null) return null;

    return (
        isAuthenticated === isAuth ? <Component />
            : <Redirect to={{ pathname: '/' }} />
    )
}

export default ProtectedRoute;