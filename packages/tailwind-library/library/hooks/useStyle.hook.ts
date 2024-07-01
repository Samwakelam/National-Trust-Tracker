'use client';

import { CSSProperties, DependencyList, useMemo } from 'react';

// MARK: Use Style Hook

export const useStyle = <T extends CSSProperties>(
    props: T,
    deps: DependencyList
): T => {
    return useMemo(() => props, deps);
};
