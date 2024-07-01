'use client';

import { useState } from 'react';
import { ToasterProps } from './Toaster.component';
import { v4 as uuid } from 'uuid';
import { ToastProps } from './Toast.component';

// MARK: Use Toast

export const useToast = () => {
    const [toasts, setToasts] = useState<ToasterProps['toasts']>([]);

    const removeToast = (id: string) => {
        setToasts((prev) => [...prev].filter((item) => item.id !== id));
    };

    const closeToast = (id: string) => {
        setTimeout(() => removeToast(id), 700);
    };

    const toast = (
        toast: Omit<ToasterProps['toasts'][0], 'id' | 'onClose'>
    ) => {
        const id = uuid();

        setToasts((prev) => [...prev, { ...toast, id, onClose: closeToast }]);
    };

    const closeAll = () => {
        setToasts([]);
    };

    toast.closeAll = closeAll;

    return {
        toasts,
        toast,
    };
};

export type UseToastReturn = ReturnType<typeof useToast>;
