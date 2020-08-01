import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Header from './components/layout/header';
import Routes from './routes';

function App() {
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
        </div>
    );
}

export default App;