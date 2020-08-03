import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

function useCallApi() {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [apiCaller] = useState(() => (
        actionType,
        endPoint,
        data,
        successCallbackFunc,
        errorCallbackFunc,
        isShowError = true,
        configs = {}
    ) => {
        setIsLoading(true);

        return axios({
            method: actionType,
            url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
            data,
            ...configs
        }).then(response => {
            if (successCallbackFunc) {
                successCallbackFunc(response);
            }
        }).catch(error => {
            if (errorCallbackFunc) {
                errorCallbackFunc(error);
            }
            if (isShowError && error.response) {
                if (typeof error.response.data === 'string') {
                    enqueueSnackbar(error.response.data);
                } else {
                    if (error.response.data.error) {
                        Object.keys(error.response.data.error).forEach(errorKey => {
                            error.response.data.error[errorKey].forEach(error => {
                                enqueueSnackbar(error);
                            })
                        });
                    }
                }
            }
        }).finally(() => {
            setIsLoading(false);
        });
    });

    return {
        isLoading,
        apiCaller
    }
}

export default useCallApi;