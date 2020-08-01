import React from 'react';
import { Form, Field } from 'react-final-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import FormField from '../../components/common/form-fields';

function Registration() {
    const onSubmit = (values) => {
        axios.post('/register', values)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const validate = () => {

    }

    return (
        <Container maxWidth="sm">
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
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
        </Container>
    );
}

export default Registration;