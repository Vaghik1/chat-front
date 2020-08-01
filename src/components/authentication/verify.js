import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function Verify() {
    let { token } = useParams();

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/verify?verification_code=${token}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [token]);

    return (
        <>
            {token}
        </>
    );
}

export default Verify;