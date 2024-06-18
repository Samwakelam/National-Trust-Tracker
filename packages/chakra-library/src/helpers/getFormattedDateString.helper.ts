export const getFormattedDateString = (date: Date) => {
    const hours = () => {
        const length = date.getHours().toString().length;
        return length === 1 ? `0${date.getHours()}` : date.getHours();
    };

    const minutes = () => {
        const length = date.getMinutes().toString().length;
        return length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    };

    return `${date.toISOString().split('T')[0]}T${hours()}:${minutes()}`;
};
