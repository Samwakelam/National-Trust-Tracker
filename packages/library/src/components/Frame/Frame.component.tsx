import React, { ReactElement } from 'react';

import { Children } from 'src/types';

import * as Chakra from '@chakra-ui/react';

export interface FrameProps extends Chakra.FlexProps, Chakra.ThemingProps {
    children?: Children;
    hasPadding?: boolean;
    id: string;
    isCoupled?: boolean;
    isWideWidth?: boolean;
    colorScheme?: Chakra.StyleFunctionProps['colorScheme'];
}

const [StylesProvider, useStyles] = Chakra.createStylesContext('Frame');

const FrameContainer = ({
    children,
    id,
    ...props
}: FrameProps): ReactElement<FrameProps> => {
    const styles = useStyles();

    return (
        <Chakra.Box
            __css={{ ...styles.container }}
            as='section'
            id={`section-${id}`}
            data-label='frame-container'
            data-scrollspy
            {...props}
        >
            {children}
        </Chakra.Box>
    );
};

const FrameContent = ({ children, id }: FrameProps) => {
    const styles = useStyles();

    return (
        <Chakra.Flex
            __css={{ ...styles.content }}
            id={id}
            data-label='frame-content'
        >
            {children}
        </Chakra.Flex>
    );
};

export const Frame = ({
    children,
    colorScheme,
    isCoupled,
    isWideWidth,
    size,
    ...props
}: FrameProps) => {
    const styles = Chakra.useMultiStyleConfig('Frame', {
        colorScheme,
        isCoupled,
        isWideWidth,
        size,
    });

    return (
        <StylesProvider value={styles}>
            <FrameContainer {...props}>
                <FrameContent {...props}>{children}</FrameContent>
            </FrameContainer>
        </StylesProvider>
    );
};
