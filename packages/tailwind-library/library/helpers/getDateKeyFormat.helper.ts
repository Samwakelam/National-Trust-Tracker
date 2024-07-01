import { monthType } from '../types/internal';

export const getDateKeyFormat = (date: Date | string) => {
    const _date = new Date(date);
    const month = _date.getMonth();
    const year = _date.getFullYear();
    const key = `${monthType[month]}-${year.toString()}`;

    return key;
};
