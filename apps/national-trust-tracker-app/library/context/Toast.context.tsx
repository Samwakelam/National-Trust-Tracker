'use client';

import {
    ReactElement,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { Toaster, ToasterProps } from '../components/Toast/Toaster.component';

// MARK: Types

type ToastContextProps = {
    (toast: Omit<ToasterProps['toasts'][0], 'id' | 'onClose'>): void;
    closeAll: () => void;
};

type ToastProviderProps = { children: ReactElement | ReactNode };

// MARK: Initial State

// @ts-ignore - can't initiate function
const initialState: ToastContextProps = {
    closeAll: function (): void {
        throw new Error('Function not implemented.');
    },
};

// MARK: Context

const ToastContext = createContext<ToastContextProps>(initialState);

// MARK: Provider

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToasterProps['toasts']>([]);

    const removeToast = (id: string) => {
        setToasts((prev) => [...prev].filter((item) => item.id !== id));
    };

    const closeToast = (id: string) => {
        setTimeout(() => removeToast(id), 700);
    };

    // MARK: toast

    const toast = (
        toast: Omit<ToasterProps['toasts'][0], 'id' | 'onClose'>
    ) => {
        console.log('toasting..');
        const id = uuid();

        setToasts((prev) => [...prev, { ...toast, id, onClose: closeToast }]);
    };

    const closeAll = () => {
        setToasts([]);
    };

    toast.closeAll = closeAll;

    // MARK: Return

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <Toaster toasts={toasts} />
        </ToastContext.Provider>
    );
};

// MARK: Use Toast

export const useToast = () => useContext(ToastContext);

export type UseToastReturn = ReturnType<typeof useToast>;
