'use client';

import { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { useDefaultTheme } from '@sam/library';

import { Navbar } from '../library/components/Navbar/Navbar.styles';
import { Spinner } from '../library/components/Spinner/Spinner.styles';

const theme = useDefaultTheme({
    components: {
        Navbar,
        Spinner,
    },
});

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ChakraProvider
            theme={theme}
            toastOptions={{ defaultOptions: { variant: 'left-accent' } }}
        >
            {children}
        </ChakraProvider>
    );
}
