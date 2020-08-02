import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

import useCallApi from '../../hooks/useCallApi';
import Loading from '../common/loading';

function Verify() {
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    let { token } = useParams();
    const { isLoading, apiCaller } = useCallApi();

    useEffect(() => {
        apiCaller('post', `auth/verify?verification_code=${token}`, null, () => {
            enqueueSnackbar('You have successfully confirmed your registration', { variant: 'success' });
            history.push('/');
        });
    }, [token, enqueueSnackbar, apiCaller, history]);

    return (
        <>
            <Typography variant="h4">
                Account Verification
            </Typography>
            <Loading open={isLoading} />
        </>
    );
}

export default Verify;