import { getFormattedDateString } from './getFormattedDateString.helper';

export const parseObjectDatesForForms = (obj: Record<string, any>) => {
    const keys = Object.keys(obj);

    let newObject: typeof obj = {};

    keys.forEach((key) => {
        if (!obj[key]) {
            newObject[key] = obj[key];
        } else if (
            typeof obj[key] !== 'object' &&
            (new Date(obj[key]).toDateString() === 'Invalid Date' ||
                typeof obj[key] === 'number')
        ) {
            newObject[key] = obj[key];
        } else if (new Date(obj[key]).toDateString() !== 'Invalid Date') {
            const date = new Date(obj[key]);

            newObject[key] = getFormattedDateString(date);
        } else if (
            typeof obj[key] === 'object' &&
            !Array.isArray(obj[key]) &&
            obj[key]
        ) {
            newObject[key] = parseObjectDatesForForms(obj[key]);
        }
    });

    return newObject;
};
