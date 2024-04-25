import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'shadow': [{ shadow: ['focus'] }],
            'font-size': [
                {
                    text: [
                        '[--color-50]',
                        '[--color-100]',
                        '[--color-200]',
                        '[--color-300]',
                        '[--color-400]',
                        '[--color-500]',
                        '[--color-600]',
                        '[--color-700]',
                        '[--color-800]',
                        '[--color-900]',
                        '[--color-950]',
                    ],
                },
            ],
            'right': [{ right: ['[calc(-75%+56px)]'] }],
        },
    },
});
