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
                        'white-50',
                        'white-100',
                        'white-200',
                        'white-300',
                        'white-400',
                        'white-500',
                        'white-600',
                        'white-700',
                        'white-800',
                        'white-900',
                        'white-950',
                        'black-50',
                        'black-100',
                        'black-200',
                        'black-300',
                        'black-400',
                        'black-500',
                        'black-600',
                        'black-700',
                        'black-800',
                        'black-900',
                        'black-950',
                    ],
                },
            ],
            'right': [{ right: ['[calc(-75%+56px)]'] }],
        },
    },
});
