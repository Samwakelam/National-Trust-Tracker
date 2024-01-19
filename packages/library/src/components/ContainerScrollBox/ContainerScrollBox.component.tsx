// external packages
import { ReactElement } from 'react';

import * as Chakra from '@chakra-ui/react';

type ContainerScrollBoxProps = Chakra.BoxProps;

export const ContainerScrollBox = ({
    children,
    ...props
}: ContainerScrollBoxProps): ReactElement<ContainerScrollBoxProps> => {
    const styles = Chakra.useStyleConfig('ContainerScrollBox');

    return (
        <Chakra.Box
            __css={styles}
            data-label='container-scroll-box'
            {...props}
        >
            {children}
        </Chakra.Box>
    );
};
