import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';

import Header from './components/layout/header';
import Routes from './routes';
import useCallApi from './hooks/useCallApi';
import { setProfile, setIsAuth } from './redux/modules/users';
import Loading from './components/common/loading';

function App() {
    const { isLoading, apiCaller } = useCallApi();
    const dispatch = useDispatch();
    const dispatchSetProfile = useCallback(
        (response) => dispatch(setProfile(response)),
        [dispatch]
    );
    const dispatchSetAuth = useCallback(
        (response) => dispatch(setIsAuth(response)),
        [dispatch]
    );

    useEffect(() => {
        apiCaller(
            'get',
            'auth/me',
            null,
            (response) => {
                dispatchSetProfile(response.data.data);
            },
            () => {
                dispatchSetAuth(false);
            },
            false,
            { withCredentials: true }
        );
    }, [apiCaller, dispatchSetProfile, dispatchSetAuth]);

    return (
        <div className="App">
            <Router>
                <Header />
                <Container>
                    <Box my={4}>
                        <Routes />
                    </Box>
                </Container>
            </Router>
            <Loading open={isLoading} />
        </div>
    );
}

export default App;