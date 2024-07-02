// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { cva } from 'class-variance-authority';

import { colorScheme } from '../../utilities/colorScheme.util';
import { twMerge } from 'tailwind-merge';

const ColoursFixture = () => {
    const colorsKeys = Object.keys(colorScheme);

    return (
        <div className='h-full p-16'>
            {colorsKeys.map((color) => {
                const styles = colorStyles({ colorScheme: color as any });

                const colorStops = [
                    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
                ];

                if (color === 'transparent' || color === 'current') return null;

                return (
                    <div
                        className={twMerge(styles)}
                        key={`${color}`}
                    >
                        <h2 className='font-bold'>{color}</h2>
                        <div className='flex flex-row flex-wrap gap-16'>
                            {colorStops.map((stop) => {
                                return (
                                    <div
                                        className='flex flex-col mb-24'
                                        key={`${color}-${stop}`}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: `var(--color-${stop})`,
                                            }}
                                            className='h-40 w-40 br-8'
                                        />
                                        <p>{stop}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ColoursFixture;

const colorStyles = cva(['flex flex-col gap-16'], {
    variants: {
        colorScheme: colorScheme,
        divergent: {
            normal: [],
        },
    },
    defaultVariants: {
        colorScheme: 'slate',
        divergent: 'normal',
    },
});
