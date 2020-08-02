import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

function useCallApi() {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const apiCaller = (actionType, endPoint, data, successCallbackFunc) => {
        setIsLoading(true);

        axios({
            method: actionType,
            url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
            data
        }).then(response => {
            enqueueSnackbar('Confirm Email', { variant: 'success' });
            successCallbackFunc(response);
        }).catch(error => {
            if (typeof error.response.data === 'string') {
                enqueueSnackbar(error.response.data);
            } else {
                Object.keys(error.response.data.error).forEach(errorKey => {
                    error.response.data.error[errorKey].forEach(error => {
                        enqueueSnackbar(error);
                    })
                });
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return {
        isLoading,
        apiCaller
    }
}

export default useCallApi;