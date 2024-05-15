export const isolateClickEvent = (callback?: Function) => {
    const invoke = (...args: any[]) => {
        if (callback) {
            args.forEach((arg) => {
                if (arg.target) arg.stopPropagation();
            });

            return callback.apply('', args);
        }
    };
    const isolated = (...args: any[]) => {
        invoke(...args);
    };

    return isolated;
};
