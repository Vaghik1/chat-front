export function validateCommonErrors(values, errors, fields) {
    const validationFunctions = {
        isRequired: (value) => {
            if (value === null || value === undefined) {
                return 'Required';
            }

            return null;
        },
        isEmail: (value) => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Wrong Email';
            }

            return null;
        },
        isMinLength: (value, { minCount }) => {
            if (value && value.length < minCount) {
                return 'Wrong minimum symbol count';
            }

            return null;
        },
        isMaxLength: (value, { maxCount }) => {
            if (value && value.length > maxCount) {
                return 'Wrong max symbol count';
            }

            return null;
        }
    }

    fields.forEach(field => {
        const { fieldName } = field;

        field.validate.forEach(validateFunc => {
            let validationFunctionName;
            let params;
            if (typeof validateFunc === 'string') {
                validationFunctionName = validateFunc;
            } else {
                const { name, ...rest } = validateFunc;
                params = rest;
                validationFunctionName = name;
            }
            const validationFunction = validationFunctions[validationFunctionName];

            if (validationFunction) {
                const isValidResult = validationFunction(values[field.fieldName], params);

                if (isValidResult) {
                    errors[fieldName] = isValidResult;
                }
            }
        });
    });
}