import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import FormField from '../../components/common/form-fields';
import profileValidation from '../../utils/validation/profileValidation';
import Loading from '../common/loading';
import useCallApi from '../../hooks/useCallApi';
import ProfileImage from './profileImage';
import { profileSelector } from '../../redux/selectors/userSelector';
import { setProfile } from '../../redux/modules/users';

function Profile() {
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, apiCaller } = useCallApi();
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();
    const dispatchSetProfile = useCallback(
        (response) => dispatch(setProfile(response)),
        [dispatch]
    );

    const onSubmit = async (values) => {
        await apiCaller('put', 'user/update', values, () => {
            enqueueSnackbar('Updated succesfully', { variant: 'success' });
        }, null, true, { withCredentials: true });
    }

    const logoutUser = () => {
        apiCaller('get', 'auth/logout', null, () => {
            dispatchSetProfile(null);
            enqueueSnackbar('Success', { variant: 'success' });
            history.push('/');
        }, null, true, { withCredentials: true });
    }

    return (
        <Container maxWidth="sm">
            <Form
                onSubmit={onSubmit}
                validate={profileValidation}
                initialValues={profile}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Profile
                                </Typography>
                            </Grid>
                            <ProfileImage />
                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    label="Email"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="username"
                                    label="Username"
                                    component={FormField}
                                    type="text"
                                    fullWidth
                                    disabled
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
                                    name="phone"
                                    label="Phone"
                                    component={FormField}
                                    fullWidth
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={logoutUser}>
                                    Logout
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

export default Profile;