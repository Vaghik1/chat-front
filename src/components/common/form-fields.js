import React from 'react';

import TextField from '@material-ui/core/TextField';

function FormField({ input, ...rest }) {
    // switch (input.type) {
    //     case 'text':
    //         return <TextField {...rest} />

    //     default:
    //         return <TextField {...rest} />
    //         break;
    // }
    return (
        <>
            <TextField {...input} {...rest} />
        </>
    );
}

export default FormField;