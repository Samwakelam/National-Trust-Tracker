import { UseToastOptions } from '@chakra-ui/react';

export type ToastProps = {
    title: string;
    description: string;
    status: UseToastOptions['status'];
};
