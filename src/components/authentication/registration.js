import React from 'react';
import { Form, Field } from 'react-final-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import FormField from '../../components/common/form-fields';
import registrationValidation from '../../utils/validation/registrationValidation';

function Registration() {
    const { enqueueSnackbar } = useSnackbar();
    const onSubmit = async (values, form) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, values)
            .then(function (response) {
                enqueueSnackbar('Confirm Email', { variant: 'success' });
                setTimeout(form.restart);
            })
            .catch(function (error) {
                if (typeof error.response.data.data === 'string') {
                    enqueueSnackbar(error.response.data.data);
                } else {
                    Object.keys(error.response.data.error).forEach(errorKey => {
                        error.response.data.error[errorKey].forEach(error => {
                            enqueueSnackbar(error);
                        })
                    });
                }
            });
    }

    return (
        <Container maxWidth="sm">
            <Form
                onSubmit={onSubmit}
                validate={registrationValidation}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Registration
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
                                    name="name"
                                    label="Full name"
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
                                <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </Container>
    );
}

export default Registration;