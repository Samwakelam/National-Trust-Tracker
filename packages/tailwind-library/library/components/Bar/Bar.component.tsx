'use client';

// MARK: Types

import { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { twMerge } from '../../utilities/twMerge.util';

import { Button, ButtonProps } from '../Button';
import { Drawer } from '../Drawer';

import { BarStyles, barStyles } from './Bar.styles';

// MARK: Types

export interface BarProps extends BarStyles {
    children?: ReactElement | ReactElement[];
    cta?: Pick<ButtonProps, 'onClick' | 'icon'>;
    className?: string;
}

// MARK: Bar

export const Bar = ({
    children,
    colorScheme,
    cta,
    divergent,
    className,
}: BarProps): ReactElement<BarProps> => {
    const styles = barStyles({
        colorScheme,
        divergent,
        className,
    });

    // MARK: Return

    return (
        <header
            data-label='bar'
            className={twMerge(styles)}
        >
            {cta && (
                <Button
                    data-label='bar-menu-button'
                    className='h-auto rounded-none'
                    icon={{ icon: 'menu-three', ariaLabel: 'menu' }}
                    colorScheme={colorScheme}
                    divergent='soft'
                    {...cta}
                />
            )}
            <div
                data-label='bar-body'
                className={twMerge(
                    'flex flex-row gap-8 w-full',
                    'px-16 py-8 sm:px-40 sm:py-16 lg:px-64 lg:py-20'
                )}
            >
                {children}
            </div>
        </header>
    );
};
