import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';

import FormField from '../../components/common/form-fields';
import registrationValidation from '../../utils/validation/registrationValidation';
import Loading from '../common/loading';
import useCallApi from '../../hooks/useCallApi';

function Registration() {
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, apiCaller } = useCallApi();
    const onSubmit = useCallback(async (values, form) => {
        await apiCaller('post', 'auth/register', values, () => {
            enqueueSnackbar('Confirm Email', { variant: 'success' });
            setTimeout(form.restart);
        });
    }, [apiCaller, enqueueSnackbar]);

    return (
        <Container maxWidth="md">
            <Form
                onSubmit={onSubmit}
                validate={registrationValidation}
                subscription={{ submitting: true, pristine: true }}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Registration
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="name"
                                    label="Full name"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="username"
                                    label="Username"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="email"
                                    label="Email"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="password"
                                    label="Password"
                                    component={FormField}
                                    fullWidth
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
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

export default Registration;