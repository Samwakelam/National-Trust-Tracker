import React, { ReactElement } from 'react';

import { Children } from '../../types';
import { ButtonProps, Button } from '..';

import * as Chakra from '@chakra-ui/react';

export interface BarProps extends Chakra.BoxProps, Chakra.ThemingProps {
    menu?: ButtonProps;
    children: Children;
    colorScheme?: Chakra.StyleFunctionProps['colorScheme'];
}

const [StylesProvider, useStyles] = Chakra.createStylesContext('Bar');

export const BarComponent = ({
    menu,
    children,
    colorScheme,
    as,
}: BarProps): ReactElement<BarProps> => {
    const styles = useStyles();

    return (
        <Chakra.Box
            as={as}
            __css={styles.container}
            data-label='bar'
        >
            {menu && (
                <Chakra.Box __css={styles.menuButton}>
                    <Button
                        icon={{
                            icon: 'menu-three',
                            ariaLabel: 'menu',
                        }}
                        colorScheme={colorScheme}
                        variant='ghost'
                        {...menu}
                    />
                </Chakra.Box>
            )}
            <Chakra.Box __css={styles.content}>{children}</Chakra.Box>
        </Chakra.Box>
    );
};

export const Bar = ({
    colorScheme,
    size,
    ...props
}: BarProps): ReactElement<BarProps> => {
    const styles = Chakra.useMultiStyleConfig('Bar', {
        colorScheme,
        size,
    });

    return (
        <StylesProvider value={styles}>
            <BarComponent
                colorScheme={colorScheme}
                {...props}
            />
        </StylesProvider>
    );
};
