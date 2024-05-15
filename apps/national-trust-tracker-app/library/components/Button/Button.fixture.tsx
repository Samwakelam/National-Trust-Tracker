'use client';

import React, { Fragment } from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { colorScheme } from '../../utilities/colorScheme.util';

import { Button, ButtonProps } from './Button.component';

import '../../prototypes/String.extensions';
import { LinkProps } from '../../types';

const ButtonGroup = ({ icon, divergent, ...props }: ButtonProps) => {
    return (
        <div className='flex flex-col gap-16 justify-end'>
            <div className='flex flex-row gap-8'>
                <Button
                    divergent={divergent}
                    {...props}
                >
                    Button
                </Button>
            </div>

            <div className='flex flex-row gap-8'>
                <Button
                    icon={icon}
                    divergent={divergent}
                    {...props}
                >
                    Button
                </Button>
                <Button
                    icon={icon}
                    divergent={divergent}
                    {...props}
                />
            </div>
        </div>
    );
};

const divergents: Exclude<ButtonProps['divergent'], null | undefined>[] = [
    'ghost',
    'outline',
    'soft',
    'solid',
];

const ButtonFixture = () => {
    const [size] = useFixtureSelect('Button Size', {
        options: ['sm', 'md'],
        defaultValue: 'md',
    });

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [iconPosition] = useFixtureSelect('Icon Position', {
        options: ['left', 'right', 'undefined'],
        defaultValue: 'undefined',
    });
    const [iconVariant] = useFixtureSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });
    const icon: ButtonProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        position: iconPosition === 'undefined' ? undefined : iconPosition,
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    const [asLink] = useFixtureInput('As Link', false);
    const link: LinkProps = {
        href: 'https://www.google.com',
    };

    const props: Partial<ButtonProps> = {
        icon,
        onClick: () => alert('clicked'),
        colorScheme: colors as ButtonProps['colorScheme'],
        size,
        link: asLink ? link : undefined,
    };

    return (
        <div className='grid gap-16 grid-cols-4 p-16'>
            <h2 className='font-bold col-start-2'>Disabled Button</h2>
            <h2 className='font-bold'>Loading Button</h2>
            <h2 className='font-bold'>Active Button</h2>

            {divergents.map((divergent) => {
                return (
                    <Fragment key={`key-${divergent}`}>
                        <h2 className='font-bold col-start-1 col-span-4'>
                            {divergent?.toCapitalisedCase()}
                        </h2>
                        <ButtonGroup
                            {...props}
                            divergent={divergent}
                        />
                        <ButtonGroup
                            {...props}
                            divergent={divergent}
                            isDisabled
                        />
                        <ButtonGroup
                            {...props}
                            divergent={divergent}
                            isLoading
                        />
                        <ButtonGroup
                            {...props}
                            divergent={divergent}
                            isActive
                        />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default ButtonFixture;
