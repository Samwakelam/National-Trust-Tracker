import clsx from 'clsx';
import React, { ReactElement } from 'react';

type FrameProps = {
    bgImage?: string;
    children?: ReactElement | ReactElement[];
    id: string;
    showOverlay?: 'to-left' | 'to-right' | 'to-top' | 'to-bottom';
    isWideWidth?: boolean;
};

export const Frame = ({
    bgImage,
    children,
    id,
    showOverlay,
    isWideWidth = false,
}: FrameProps) => {
    return (
        <section
            data-label='frame'
            style={{ backgroundImage: `url(${bgImage})` }}
            className={clsx(
                'bg-pink-100 w-full relative px-16 py-56 md:px-32 lg:px-56 lg:py-60',
                'bg-no-repeat bg-cover'
            )}
            id={`section-${id}`}
        >
            {showOverlay && (
                <div
                    data-label='frame-overlay'
                    className={clsx(
                        'absolute top-0 bottom-0 left-0 right-0',
                        resolveOverlayGradient(showOverlay),
                        'from-slate-900/75 to-70%'
                    )}
                />
            )}
            <div
                data-label='frame-content'
                className={clsx(
                    'bg-blue-100 relative flex flex-col w-full gap-16 md:gap-32 lg:gap-56 pt-56 lg:pt-60 mt-[-56px] lg:mt-[-60px] items-center z-10 mx-auto ',
                    isWideWidth ? 'max-w-4/5' : 'max-w-7/10'
                )}
                id={id}
            >
                {children}
            </div>
        </section>
    );
};

// data-label='' className=''

const resolveOverlayGradient = (
    showOverlay: FrameProps['showOverlay'] = 'to-right'
): string => {
    switch (showOverlay) {
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
