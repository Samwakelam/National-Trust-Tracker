export const breakpoints: Record<string, string> = {
    'xs': '320px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
};

export const devices = {
    'xs': `(min-width: ${breakpoints.xs})`,
    'sm': `(min-width: ${breakpoints.sm})`,
    'md': `(min-width: ${breakpoints.md})`,
    'lg': `(min-width: ${breakpoints.lg})`,
    'xl': `(min-width: ${breakpoints.xl})`,
    '2xl': `(min-width: ${breakpoints['2xl']})`,
};

export const mediaQueries = {
    'xs': `@media ${devices.xs}`,
    'sm': `@media ${devices.sm}`,
    'md': `@media ${devices.md}`,
    'lg': `@media ${devices.lg}`,
    'xl': `@media ${devices.xl}`,
    '2xl': `@media ${devices['2xl']}`,
};
