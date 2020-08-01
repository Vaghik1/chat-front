import { validateCommonErrors } from './validateCommonErrors';

export default (values) => {
    const errors = {};

    validateCommonErrors(values, errors, [
        {
            fieldName: 'email',
            validate: ['isEmail', 'isRequired']
        },
        {
            fieldName: 'name',
            validate: [
                'isRequired',
                { name: 'isMinLength', minCount: 5 },
                { name: 'isMaxLength', maxCount: 50 }
            ]
        },
        {
            fieldName: 'password',
            validate: [
                { name: 'isMinLength', minCount: 8 },
                'isRequired'
            ]
        },
    ]);

    return errors;
}