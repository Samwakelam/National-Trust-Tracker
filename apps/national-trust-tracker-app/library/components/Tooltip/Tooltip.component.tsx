'use client';
import {
    CSSProperties,
    DependencyList,
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { twMerge } from '../../utilities/twMerge.util';

// MARK: Type

export type TooltipProps = {
    children: ReactElement;
    label: string;
    hasArrow?: boolean;
    alwaysOpen?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
};

// MARK: Use Style Hook

const useStyle = <T extends CSSProperties>(
    props: T,
    deps: DependencyList
): T => {
    return useMemo(() => props, deps);
};

// MARK: Tooltip

export const Tooltip = ({
    children,
    label,
    hasArrow = true,
    alwaysOpen = false,
    position = 'top',
}: TooltipProps): ReactElement<TooltipProps> => {
    const tooltip = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [size, setSize] = useState<{ height: number; width: number }>({
        height: 0,
        width: 0,
    });

    const style = useStyle<Record<string, string>>(
        {
            '--tooltip-vertical-position':
                position === 'top' || position === 'bottom'
                    ? `-${size.height + 8}px`
                    : `${size.height / 2}px`,
            '--tooltip-horizontal-position':
                position === 'left' || position === 'right'
                    ? `-${size.width + 8}px`
                    : `${size.width / 2}px`,
        },
        [size, position, label]
    );

    // MARK: Effects

    useEffect(() => {
        setIsVisible(alwaysOpen);
    }, [alwaysOpen]);

    useEffect(() => {
        if (tooltip.current) {
            const width = tooltip.current.clientWidth;
            const height = tooltip.current.clientHeight;

            setSize({ height, width });
        } else {
            setSize({ height: 0, width: 0 });
        }
    }, [tooltip, label]);

    // MARK: Return

    return (
        <div className='relative'>
            <div
                style={style}
                ref={tooltip}
                className={twMerge(
                    'bg-black-700 w-fit max-w-320 absolute z-10 rounded-8 py-2 px-8',
                    isVisible ? 'visible' : 'invisible',
                    resolvePosition(position)
                )}
            >
                <p
                    className={twMerge(
                        'relative w-full text-center text-white-300',
                        hasArrow && resolveArrowPosition(position)
                    )}
                    role='tooltip'
                >
                    {label}
                </p>
            </div>
            <div
                onMouseEnter={() => {
                    if (alwaysOpen) return;
                    setIsVisible(true);
                }}
                onMouseLeave={() => {
                    if (alwaysOpen) return;
                    setIsVisible(false);
                }}
            >
                {children}
            </div>
        </div>
    );
};

// MARK: Resolve Functions

const resolvePosition = (position: TooltipProps['position']) => {
    switch (position) {
        case 'top':
            return 'top-[--tooltip-vertical-position] left-[calc(50%-var(--tooltip-horizontal-position))]';
        case 'bottom':
            return 'bottom-[--tooltip-vertical-position] left-[calc(50%-var(--tooltip-horizontal-position))]';
        case 'left':
            return 'left-[--tooltip-horizontal-position] top-[calc(50%-var(--tooltip-vertical-position))]';
        case 'right':
            return 'right-[--tooltip-horizontal-position] top-[calc(50%-var(--tooltip-vertical-position))]';
    }
};

const resolveArrowPosition = (position: TooltipProps['position']) => {
    switch (position) {
        case 'bottom':
            return [
                'after:block after:absolute after:border-[5px] after:border-solid',
                'after:left-[calc(50%-4px)] after:bottom-[calc(100%+2px)] after:mt-0',
                'after:border-b-black-700 after:border-r-transparent after:border-l-transparent after:border-t-transparent',
            ];
        case 'left':
            return [
                'after:block after:absolute after:border-[5px] after:border-solid',
                'after:left-[calc(100%+8px)] after:top-1/2 after:mt-[-5px]',
                'after:border-l-black-700 after:border-r-transparent after:border-b-transparent after:border-t-transparent',
            ];
        case 'right':
            return [
                'after:block after:absolute after:border-[5px] after:border-solid',
                'after:right-[calc(100%+8px)] after:top-1/2 after:mt-[-5px]',
                'after:border-r-black-700 after:border-l-transparent after:border-b-transparent after:border-t-transparent',
            ];
        case 'top':
            return [
                'after:block after:absolute after:border-[5px] after:border-solid',
                'after:left-[calc(50%-4px)] after:top-[calc(100%+2px)] after:mt-0',
                'after:border-t-black-700 after:border-r-transparent after:border-b-transparent after:border-l-transparent',
            ];
    }
};
