import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import FormField from '../../components/common/form-fields';
import Loading from '../common/loading';
import { setProfile } from '../../redux/modules/users';
import useCallApi from '../../hooks/useCallApi';
import loginValidation from '../../utils/validation/loginValidation';

function Login() {
    let history = useHistory();
    const { isLoading, apiCaller } = useCallApi();
    const dispatch = useDispatch();
    const dispatchSetProfile = useCallback(
        (response) => dispatch(setProfile(response)),
        [dispatch]
    );
    const onSubmit = useCallback((values) => {
        apiCaller('post', 'auth/login', values, (response) => {
            dispatchSetProfile(response.data.data);
            history.push('/');
        }, null, true, { withCredentials: true });
    }, [apiCaller, dispatchSetProfile, history]);

    return (
        <Container maxWidth="sm">
            <Form
                onSubmit={onSubmit}
                validate={loginValidation}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    label="Email"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="password"
                                    label="Password"
                                    component={FormField}
                                    fullWidth
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
            <Loading open={isLoading} />
        </Container>
    );
}

export default Login;