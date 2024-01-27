import React, { ReactElement } from 'react';

import { Children } from '../../types';

import * as Chakra from '@chakra-ui/react';

export interface FrameProps extends Chakra.FlexProps, Chakra.ThemingProps {
    children?: Children;
    hasPadding?: boolean;
    id: string;
    isCoupled?: boolean;
    isWideWidth?: boolean;
    colorScheme?: Chakra.StyleFunctionProps['colorScheme'];
    showOverlay?: 'from-left' | 'from-right' | 'from-top' | 'from-bottom';
}

const [StylesProvider, useStyles] = Chakra.createStylesContext('Frame');

const FrameOverlay = () => {
    const styles = useStyles();

    return (
        <Chakra.Box
            __css={{ ...styles.overlay }}
            data-label='frame-overlay'
        />
    );
};

const FrameContainer = ({
    children,
    id,
    showOverlay,
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
            {showOverlay && <FrameOverlay />}
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
    showOverlay,
    size,
    ...props
}: FrameProps) => {
    const styles = Chakra.useMultiStyleConfig('Frame', {
        colorScheme,
        isCoupled,
        isWideWidth,
        showOverlay,
        size,
    });

    return (
        <StylesProvider value={styles}>
            <FrameContainer
                showOverlay={showOverlay}
                {...props}
            >
                <FrameContent {...props}>{children}</FrameContent>
            </FrameContainer>
        </StylesProvider>
    );
};
