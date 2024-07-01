export const getAmountInPence = (pounds: string): number => {
    const pence = parseFloat(pounds) * 100;

    return pence;
};

export const getAmountInPounds = (pence: number): string => {
    const length = pence.toString().length;

    const index = length - 2;

    const array = pence.toString().split('');
    array.splice(index, 0, '.');

    const pounds = array.join('');

    return pounds;
};
