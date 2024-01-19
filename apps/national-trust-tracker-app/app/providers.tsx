'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme, useDefaultTheme } from '@sam/library';

import { Navbar } from '../components/Navbar/Navbar.styles';
import { extendTheme } from '@chakra-ui/react';

const theme = useDefaultTheme({
    components: {
        Navbar,
    },
});

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider
            theme={theme}
            toastOptions={{ defaultOptions: { variant: 'left-accent' } }}
        >
            {children}
        </ChakraProvider>
    );
}
