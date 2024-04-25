import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { twMerge } from '../../utilities/twMerge.util';

import { Button, ButtonProps } from '../Button';

import { useFrameStyles, FrameStyles } from './Frame.styles';

// MARK: Types

interface FrameComponentProps extends Omit<FrameStyles, 'hero'> {
    bgImage?: string;
    children?: ReactElement | ReactElement[];
    id: string;
    overlayDirection?: 'to-left' | 'to-right' | 'to-top' | 'to-bottom';
    isWideWidth?: boolean;
}

interface FrameControlsProps
    extends Omit<FrameComponentProps, 'overlayDirection'> {
    preset: 'controls';
    navigationCTA?: ButtonProps;
}

interface FrameDefaultProps extends FrameComponentProps {
    preset?: never;
}

export type FrameProps = FrameControlsProps | FrameDefaultProps;

// MARK: Frame Component

export const FrameComponent = ({
    bgImage,
    children,
    colorScheme,
    divergent,
    size,
    id,
    overlayDirection = 'to-right',
    isWideWidth = false,
}: FrameComponentProps) => {
    const { frame, content } = useFrameStyles({
        colorScheme,
        divergent,
        size,
        hero: !!bgImage,
    });

    // MARK: Return

    return (
        <section
            data-label='frame'
            style={{ backgroundImage: `url(${bgImage})` }}
            className={twMerge(frame())}
            id={`section-${id}`}
        >
            {!!bgImage && (
                <div
                    data-label='frame-overlay'
                    className={twMerge(
                        'absolute top-0 bottom-0 left-0 right-0',
                        resolveOverlayGradient(overlayDirection),
                        'from-slate-900/75 to-70%'
                    )}
                />
            )}
            <div
                data-label='frame-content'
                className={twMerge(
                    content(twMerge(isWideWidth ? 'max-w-1280' : 'max-w-1120'))
                )}
                id={id}
            >
                {children}
            </div>
        </section>
    );
};

// MARK: Frame

export const Frame = ({ preset, children, ...props }: FrameProps) => {
    switch (preset) {
        case 'controls':
            return (
                <FrameComponent
                    divergent='banner'
                    {...props}
                >
                    <div
                        className={twMerge(
                            'flex flex-row items-center justify-between w-full'
                        )}
                    >
                        {(props as FrameControlsProps).navigationCTA && (
                            <Button
                                divergent='soft'
                                icon={{ icon: 'arrow-l', ariaLabel: 'back' }}
                                {...(props as FrameControlsProps).navigationCTA}
                            />
                        )}
                        <div className='flex flex-row flex'>{children}</div>
                    </div>
                </FrameComponent>
            );
        default:
            return <FrameComponent {...props}>{children}</FrameComponent>;
    }
};

// data-label='' className=''

// MARK: Resolve Functions

const resolveOverlayGradient = (
    overlayDirection: FrameComponentProps['overlayDirection'] = 'to-right'
): string => {
    switch (overlayDirection) {
        case 'to-bottom':
            return 'bg-gradient-to-b';
        case 'to-left':
            return 'bg-gradient-to-l';
        case 'to-right':
            return 'bg-gradient-to-r';
        case 'to-top':
            return 'bg-gradient-to-t';
    }
};
