export const debounce = (callback: Function, wait: number = 300) => {
    let timerId: NodeJS.Timeout;

    const invoke = (...args: any[]) => {
        clearTimeout(timerId);

        return callback.apply('', args);
    };

    const startTimer = (pendingFunction: Function, milliseconds: number) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        const timer = setTimeout(() => pendingFunction(), milliseconds);
        timerId = timer;
    };

    const debounced = (...args: any[]) => {
        startTimer(() => invoke(...args), wait);
    };

    // Note: this is the key to wrapping functions and accessing the passed arguments
    return debounced;
};
