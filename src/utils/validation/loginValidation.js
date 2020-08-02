import { validateCommonErrors } from './validateCommonErrors';

export default (values) => {
    const errors = {};

    validateCommonErrors(values, errors, [
        {
            fieldName: 'email',
            validate: ['isEmail', 'isRequired']
        },
        {
            fieldName: 'password',
            validate: ['isRequired']
        },
    ]);

    return errors;
}