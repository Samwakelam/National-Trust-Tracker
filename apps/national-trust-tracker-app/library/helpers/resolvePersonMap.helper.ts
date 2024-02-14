import { Person } from '../types/internal';

export const resolvePersonMap = (
    person: Person,
    index: number,
    array: {
        name: string;
    }[]
) => {
    if (index === array.length - 1) return person.name;
    if (index === array.length - 2 || (array.length == 2 && index === 0))
        return `${person.name} and `;

    return `${person.name}, `;
};
