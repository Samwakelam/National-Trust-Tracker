import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

import { Button, FixtureBox } from '../components';

import * as Chakra from '@chakra-ui/react';

// Note: The Toast is controlled by Chakra Alert styles. We have set up an Alert.styles export in the components file. There is no relevant component for toast.

const ToastFixture = () => {
    const toast = Chakra.useToast();

    const [hasTitle] = useValue<boolean>('Has Title', { defaultValue: false });

    const [hasDescription] = useValue<boolean>('Has Description', {
        defaultValue: false,
    });
    const [status] = useSelect('Status', {
        options: ['info', 'warning', 'success', 'error', 'loading'],
        defaultValue: 'success',
    });
    const [isClosable] = useValue<boolean>('Is Closable', {
        defaultValue: true,
    });
    const [position] = useSelect('Position', {
        options: [
            'top',
            'top-right',
            'top-left',
            'bottom',
            'bottom-right',
            'bottom-left',
        ],
        defaultValue: 'top',
    });
    const [variant] = useSelect('Variant', {
        options: ['subtle', 'solid', 'left-accent', 'top-accent'],
        defaultValue: 'left-accent',
    });

    return (
        <FixtureBox hasPadding>
            <Button
                onClick={() => {
                    toast({
                        title: hasTitle ? 'Toast Title' : undefined,
                        description: hasDescription
                            ? 'Toast Description'
                            : undefined,
                        status,
                        duration: null,
                        isClosable,
                        position,
                        variant: variant,
                    });
                }}
            >
                Toast
            </Button>
        </FixtureBox>
    );
};

export default ToastFixture;
