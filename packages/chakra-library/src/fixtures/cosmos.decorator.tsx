// Note: React must be declared in all files for cosmos to work
import React, { ReactNode } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';

// Note: Full paths must be used in all files for cosmos to work
import { defaultTheme } from '../theme/default-theme.config';
import { darkBackground, lightBackground } from '../utils/colours.utils';

export default ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider theme={defaultTheme({})}>
            <Box
                minHeight='100vh'
                bg={lightBackground}
                _dark={{
                    bg: darkBackground,
                }}
            >
                {children}
            </Box>
        </ChakraProvider>
    );
};
