export const resolveCurrency = (currency: string): string => {
    switch (currency) {
        case 'GBP':
            return '£';
        default:
            return currency;
    }
};
