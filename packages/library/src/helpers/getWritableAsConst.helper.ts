export const getWritableAsConst = <T extends any>(
    arr: T[] | readonly T[]
): T[] => arr as T[];
