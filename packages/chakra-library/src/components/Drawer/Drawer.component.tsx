import React, { ReactElement } from 'react';

import { Button, ButtonProps } from '..';

import * as Chakra from '@chakra-ui/react';

export interface DrawerProps extends Chakra.DrawerProps {
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    isOpen: boolean;
    onClose: () => void;
    showOverlay?: boolean;
    title?: string;
    children: ReactElement | ReactElement[];
}

export const Drawer = ({
    confirmCTA,
    declineCTA,
    isOpen,
    onClose,
    placement = 'right',
    showOverlay = false,
    size = 'lg',
    title,
    children,
    ...props
}: DrawerProps): ReactElement<DrawerProps> => {
    const { space, colors } = Chakra.useTheme();

    const sx = {
        '--border-radius': resolveBorderRadius(placement, space),
        '--btn-grid-column': placement === 'left' ? '2' : '1',
        '--grid-template-columns':
            placement === 'left' ? `1fr ${space[32]}` : `${space[32]} 1fr`,
        '--overlay-background': showOverlay
            ? colors.blackAlpha[600]
            : colors.blackAlpha[300],
        '--title-grid-column': placement === 'left' ? '1' : '2',
    };

    return (
        <Chakra.Drawer
            isOpen={isOpen}
            placement={placement}
            onClose={() => onClose()}
            size={size}
            {...props}
            data-label='drawer-dialog-container'
        >
            <Chakra.DrawerOverlay sx={sx} />
            <Chakra.DrawerContent
                data-label='drawer-dialog'
                sx={sx}
            >
                <Chakra.DrawerHeader sx={sx}>
                    <Chakra.DrawerCloseButton />
                    {title && <h5>{title}</h5>}
                </Chakra.DrawerHeader>

                <Chakra.DrawerBody as='aside'>{children}</Chakra.DrawerBody>

                <Chakra.DrawerFooter>
                    {(declineCTA || confirmCTA) && (
                        <Button
                            variant='outline'
                            colorScheme='gray'
                            onClick={() => onClose()}
                            children='Cancel'
                            {...declineCTA}
                        />
                    )}
                    {confirmCTA && (
                        <Button
                            variant='solid'
                            colorScheme='facebook'
                            {...confirmCTA}
                        />
                    )}
                </Chakra.DrawerFooter>
            </Chakra.DrawerContent>
        </Chakra.Drawer>
    );
};

const resolveBorderRadius = (
    placement: DrawerProps['placement'],
    space: Record<number, string>
): string => {
    switch (placement) {
        case 'left':
            return `0 ${space[16]} ${space[16]} 0`;
        case 'top':
            return `0 0 ${space[16]}  ${space[16]}`;
        case 'bottom':
            return `${space[16]} ${space[16]} 0 0`;
        default:
            return `${space[16]} 0 0 ${space[16]}`;
    }
};
