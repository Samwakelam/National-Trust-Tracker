import React from 'react';
import { useForm } from 'react-hook-form';

import { MultiSwitch } from '../MultiSwitch';

import * as Chakra from '@chakra-ui/react';

interface FixtureBoxProps extends Chakra.FlexProps {
    hasPadding?: boolean;
}

export const FixtureBox = ({
    hasPadding,
    children,
    ...props
}: FixtureBoxProps) => {
    const { colorMode, toggleColorMode } = Chakra.useColorMode();

    const { space, colors } = Chakra.useTheme();

    const {
        register,
        formState: { errors },
    } = useForm<any>({ mode: 'onChange' });

    const padding = hasPadding ? space[16] : '0';

    return (
        <Chakra.Flex
            data-label='fixture-box'
            direction='column'
            alignItems='flex-start'
            w='100%'
            h='100vh'
        >
            <Chakra.Flex
                data-label='fixture-box-controls'
                w='100%'
                justifyContent='flex-end'
                padding={space[16]}
                borderBottom={`${space[1]} solid ${colors.gray[500]}`}
            >
                <MultiSwitch<any>
                    switches={[
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                    ]}
                    groupConfig={{
                        onChange: (value) => {
                            if (value !== colorMode) {
                                toggleColorMode();
                            }
                        },
                        defaultValue: colorMode,
                    }}
                    formRegister={{ register }}
                    name='colorMode'
                    errors={errors}
                />
            </Chakra.Flex>
            <Chakra.Flex
                data-label='fixture-box-container'
                direction='column'
                alignItems='flex-start'
                position='relative'
                w='100%'
                h='100%'
                p={padding}
                {...props}
            >
                {children}
            </Chakra.Flex>
        </Chakra.Flex>
    );
};
