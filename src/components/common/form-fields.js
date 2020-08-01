import React from 'react';
import { FormControl, FormHelperText, TextField } from '@material-ui/core';

function FormField({ input, meta, ...rest }) {
    return (
        <FormControl error={meta.error && meta.touched} fullWidth={rest.fullWidth}>
            <TextField {...input} {...rest} />
            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    );
}

export default FormField;