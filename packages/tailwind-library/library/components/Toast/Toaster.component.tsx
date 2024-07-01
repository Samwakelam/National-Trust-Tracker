import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { Toast, ToastProps } from './Toast.component';

export type ToasterProps = {
    toasts: ToastProps[];
    position?: string;
};

// MARK: Toaster

export const Toaster = ({ toasts }: ToasterProps) => {
    const listStyles = 'fixed z-20 flex flex-col-reverse';

    const top = 'top-12';
    const right = 'right-12';
    const bottom = 'bottom-12';
    const left = 'left-12';

    const positionStyles = {
        'top': `${top} right-[50%]`,
        'top-left': `${top}`,
        'top-right': `${top} ${right}`,
    };

    const rack = useMemo((): Record<
        Exclude<ToastProps['position'], undefined>,
        ToasterProps['toasts']
    > => {
        return {
            'top': toasts.filter(
                (toast) =>
                    toast.position === 'top' || toast.position === undefined
            ),
            'top-left': toasts.filter((toast) => toast.position === 'top-left'),
            'top-right': toasts.filter(
                (toast) => toast.position === 'top-right'
            ),
        };
    }, [toasts]);

    return (
        <div
            data-label='toaster'
            className={twMerge(
                `fixed ${top} ${bottom} ${left} ${right} pointer-events-none`
            )}
        >
            {Object.keys(rack).flatMap((position) => {
                if (rack[position as keyof typeof rack].length > 0) {
                    return (
                        <div
                            data-label='rack'
                            className={twMerge(
                                listStyles,
                                positionStyles[
                                    position as keyof typeof positionStyles
                                ]
                            )}
                        >
                            {rack[position as keyof typeof rack].map(
                                (toast) => {
                                    return (
                                        <Toast
                                            key={`toast-${toast.title}`}
                                            {...toast}
                                        />
                                    );
                                }
                            )}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
