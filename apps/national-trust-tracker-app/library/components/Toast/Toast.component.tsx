'use client';

import { useEffect, useRef, useState } from 'react';

import { twMerge } from '../../utilities/twMerge.util';
import { Button } from '../Button';
import { Icon, IconProps } from '../Icon';
import { useStyle } from '../../hooks/useStyle.hook';

import { ToastStyles, toastStyles } from './Toast.styles';

// MARK: Type

type ToastStatus = 'info' | 'warning' | 'success' | 'error';
type ToastPosition = 'top' | 'top-left' | 'top-right';

export interface ToastProps extends Omit<ToastStyles, 'colorScheme'> {
    description: string;
    duration?: number;
    id: string;
    onClose: (id: string) => void;
    position?: ToastPosition;
    status: ToastStatus;
    title: string;
}

// MARK: Toast

export const Toast = ({
    description,
    divergent,
    duration,
    id,
    onClose,
    position = 'top',
    status,
    title,
}: ToastProps) => {
    const ref = useRef<HTMLOutputElement>(null);

    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    const styles = toastStyles({
        colorScheme: resolveColorScheme(status),
        divergent,
        className: twMerge(
            show && 'opacity-100 translate-y-0',
            position === 'top' && 'left-[--toast-offset]',
            position === 'top-right' && 'right-0'
        ),
    });

    const style = useStyle<Record<string, string>>(
        {
            '--container-height': `${containerHeight}px`,
            '--container-width': `${containerWidth}px`,
            '--toast-offset':
                position === 'top'
                    ? `-${containerWidth / 2}px`
                    : `${containerWidth / 4}px`,
        },
        [containerHeight]
    );

    // MARK: Handlers

    const handleClose = () => {
        setShow(false);
        onClose(id);
    };

    // MARK: Effects

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.clientHeight;
            const width = ref.current.clientWidth;
            setContainerHeight(height);
            setContainerWidth(width);
        } else {
            setContainerHeight(0);
            setContainerWidth(0);
        }
    }, [ref]);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 300);
    }, []);

    useEffect(() => {
        if (duration) {
            setTimeout(() => handleClose(), duration);
        }
    }, [duration]);

    // MARK: Return

    return (
        <div
            data-label='toast'
            style={style}
            className={twMerge(
                'h-0 relative transition-all duration-700 ease-out pointer-events-auto',
                show && '[&:not(:last-child)]:mt-12 h-[--container-height]'
            )}
        >
            <output
                ref={ref}
                data-label='list-item'
                style={style}
                className={twMerge(styles)}
            >
                <Button
                    divergent={divergent === 'solid' ? 'solid' : 'soft'}
                    colorScheme={resolveColorScheme(status)}
                    icon={{ icon: 'cross', ariaLabel: 'close' }}
                    className='absolute top-8 right-8'
                    onClick={() => handleClose()}
                />
                <Icon
                    {...resolveIcon(status)}
                    className={twMerge(
                        'row-start-1 col-start-1 self-center',
                        resolveIconTextColor(status, divergent)
                    )}
                />

                <h5 className='col-start-2 row-start-1 font-bold text-nowrap'>
                    {title}
                </h5>
                <p className='col-start-2 row-start-2 text-nowrap'>
                    {description}
                </p>
            </output>
        </div>
    );
};

// MARK: Resolve Functions

const resolveColorScheme = (status: ToastStatus) => {
    switch (status) {
        case 'error':
            return 'red';
        case 'info':
            return 'blue';
        case 'success':
            return 'green';
        case 'warning':
            return 'orange';
    }
};

const resolveIconTextColor = (
    status: ToastStatus,
    divergent: ToastStyles['divergent']
) => {
    switch (status) {
        case 'error':
            return divergent === 'solid' ? 'text-red-200' : 'text-red-400';
        case 'info':
            return divergent === 'solid' ? 'text-blue-200' : 'text-blue-400';
        case 'success':
            return divergent === 'solid' ? 'text-green-200' : 'text-green-400';
        case 'warning':
            return divergent === 'solid'
                ? 'text-orange-200'
                : 'text-orange-400';
    }
};

const resolveIcon = (status: ToastStatus): IconProps => {
    switch (status) {
        case 'error':
            return { icon: 'circle-cross', ariaLabel: 'error' };
        case 'info':
            return { icon: 'circle-info', ariaLabel: 'info' };
        case 'success':
            return { icon: 'circle-tick', ariaLabel: 'success' };
        case 'warning':
            return { icon: 'warning', ariaLabel: 'warning' };
    }
};
