import React, { ReactElement, useState } from 'react';

import * as Chakra from '@chakra-ui/react';

import { Button, IconProps } from '..';

export type BarFloatingProps = {
    buttonIcon?: { open?: IconProps['icon']; close?: IconProps['icon'] };
    children: ReactElement | ReactElement[];
    colorScheme?: Chakra.StyleFunctionProps['colorScheme'];
    gap?: Chakra.StyleProps['gap'];
};

const [StylesProvider, useStyles] = Chakra.createStylesContext('BarFloating');

export const BarFloatingComponent = ({
    buttonIcon,
    children,
    colorScheme,
    gap,
}: BarFloatingProps) => {
    const styles = useStyles();

    const theme = Chakra.useTheme();
    const positionX = Chakra.useBreakpointValue({
        'base': theme.space[16],
        'sm': theme.space[16],
        'md': theme.space[32],
        'lg': theme.space[56],
        'xl': theme.space[56],
        '2xl': theme.space[56],
    });

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const sx = {
        '--bar-right': isOpen ? positionX : 'auto',
        '--bar-left': positionX,
    };

    return (
        <Chakra.Flex
            data-label='bar-floating'
            direction='row'
            __css={{ ...styles.container, ...sx }}
        >
            <Button
                icon={{
                    ariaLabel: 'menu',
                    icon: resolveButtonIcon(isOpen, buttonIcon),
                    ...buttonIcon,
                    boxSize: theme.space[24],
                }}
                colorScheme={colorScheme}
                variant='gradient'
                onClick={() => setIsOpen(!isOpen)}
                height={56}
                borderRadius={48}
                minWidth={56}
            />

            <Chakra.Box
                __css={styles.content}
                display={isOpen ? 'flex' : 'none'}
                gap={gap}
            >
                <Chakra.Flex
                    direction='row'
                    flexShrink={0}
                    overflowX={'auto'}
                >
                    {children}
                </Chakra.Flex>
            </Chakra.Box>
        </Chakra.Flex>
    );
};
export const BarFloating = ({
    colorScheme,
    ...props
}: BarFloatingProps): ReactElement<BarFloatingProps> => {
    const styles = Chakra.useMultiStyleConfig('BarFloating', {
        colorScheme: colorScheme,
    });

    return (
        <StylesProvider value={styles}>
            <BarFloatingComponent
                colorScheme={colorScheme}
                {...props}
            />
        </StylesProvider>
    );
};

const resolveButtonIcon = (
    isOpen: boolean,
    buttonIcon: BarFloatingProps['buttonIcon']
) => {
    switch (isOpen) {
        case true:
            return buttonIcon?.close ? buttonIcon.close : 'remove';
        case false:
            return buttonIcon?.open ? buttonIcon.open : 'plus';
    }
};
