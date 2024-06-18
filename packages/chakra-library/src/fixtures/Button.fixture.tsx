/* eslint-disable no-useless-computed-key */

// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Button, ButtonProps, FixtureBox } from '../components';
import { colorScheme, whiteText } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const variants: ButtonProps['variant'][] = [
    'ghost',
    'gradient',
    'outline',
    'elevated',
    'solid',
    'unstyled',
];

const ButtonFixture = ({ children }: ButtonProps) => {
    const [variant] = useSelect('Button Variant', {
        options: variants as string[],
        defaultValue: 'solid',
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    const [icon] = useSelect('Icon', {
        options: ['bin', 'comment', 'location', 'filter', 'thumbs-u'],
    });

    const [iconVariant] = useSelect('Icon Variant', {
        options: ['solid', 'outline'],
    });

    const [iconPosition] = useSelect('Icon Position', {
        options: ['left', 'right', 'undefined'],
        defaultValue: 'undefined',
    });

    const [size] = useSelect('Size', {
        options: ['lg', 'md', 'sm', 'xs'],
        defaultValue: 'md',
    });

    const [notification] = useValue<boolean>('Add Notification', {
        defaultValue: false,
    });

    const [tooltip] = useValue<boolean>('Add Tooltip', { defaultValue: false });

    const Icon = {
        icon: icon,
        ariaLabel: icon,
        variant: iconVariant,
        position: iconPosition === 'undefined' ? undefined : iconPosition,
    };

    const Notification = {
        children: '1',
        colorScheme: 'red',
        variant: 'solid',
        color: whiteText,
    };

    return (
        <FixtureBox
            hasPadding
            gap='1rem'
        >
            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                Basic Button
            </Chakra.Heading>
            <Button
                colorScheme={scheme}
                onClick={() => {
                    alert('The button has been clicked');
                }}
                variant={variant}
                size={size}
                notification={notification ? Notification : undefined}
            >
                {children}
            </Button>

            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                Icon Buttons
            </Chakra.Heading>
            <Chakra.Flex
                direction='row'
                gap={16}
            >
                <Button
                    colorScheme={scheme}
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    icon={Icon}
                    size={size}
                    notification={notification ? Notification : undefined}
                    tooltip={
                        tooltip
                            ? {
                                  label: icon,
                              }
                            : undefined
                    }
                />

                <Button
                    colorScheme={scheme}
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    icon={Icon}
                    size={size}
                    notification={notification ? Notification : undefined}
                    tooltip={
                        tooltip
                            ? {
                                  label: icon,
                              }
                            : undefined
                    }
                >
                    {children}
                </Button>
            </Chakra.Flex>

            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                Disabled
            </Chakra.Heading>
            <Chakra.Flex
                direction='row'
                gap={16}
            >
                <Button
                    colorScheme={scheme}
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    isDisabled={true}
                    icon={Icon}
                    size={size}
                    notification={notification ? Notification : undefined}
                    tooltip={
                        tooltip
                            ? {
                                  label: icon,
                              }
                            : undefined
                    }
                />

                <Button
                    colorScheme={scheme}
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    icon={Icon}
                    isDisabled={true}
                    size={size}
                    notification={notification ? Notification : undefined}
                    tooltip={
                        tooltip
                            ? {
                                  label: icon,
                              }
                            : undefined
                    }
                >
                    Disabled
                </Button>
            </Chakra.Flex>

            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                Loading
            </Chakra.Heading>
            <Chakra.Flex
                direction='row'
                gap={16}
            >
                <Button
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    isLoading={true}
                    colorScheme={scheme}
                    size={size}
                    icon={Icon}
                    notification={notification ? Notification : undefined}
                />

                <Button
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    icon={Icon}
                    isLoading={true}
                    colorScheme={scheme}
                    size={size}
                    notification={notification ? Notification : undefined}
                >
                    Loading
                </Button>

                <Button
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    icon={{
                        icon: icon,
                        ariaLabel: 'icon-test',
                        variant: iconVariant,
                        position:
                            iconPosition === 'undefined'
                                ? undefined
                                : iconPosition,
                    }}
                    isLoading={true}
                    colorScheme={scheme}
                    loadingText='Loading Text'
                >
                    Loading
                </Button>
            </Chakra.Flex>

            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                Active
            </Chakra.Heading>
            <Chakra.Flex
                direction='row'
                gap={16}
            >
                <Button
                    isActive={true}
                    onClick={() => {
                        alert('The button has been clicked');
                    }}
                    variant={variant}
                    colorScheme={scheme}
                    icon={{
                        icon: icon,
                        ariaLabel: icon,
                        variant: iconVariant,
                        position:
                            iconPosition === 'undefined'
                                ? undefined
                                : iconPosition,
                    }}
                >
                    Active
                </Button>
            </Chakra.Flex>
        </FixtureBox>
    );
};

export default {
    Button: () => <ButtonFixture>Button</ButtonFixture>,
    ['Button Variants']: () => {
        const [scheme] = useSelect('Colour Scheme', {
            options: colorScheme,
            defaultValue: 'gray',
        });

        const [isActive] = useValue<boolean>('Is Active', {
            defaultValue: false,
        });

        return (
            <FixtureBox
                hasPadding
                gap='1rem'
            >
                {variants.map((variant) => (
                    <Chakra.Box key={variant as string}>
                        <Chakra.Heading
                            as='h6'
                            size={'sm'}
                            color='gray.300'
                            mb={4}
                        >
                            {variant as string}
                        </Chakra.Heading>
                        <Button
                            variant={variant}
                            colorScheme={scheme}
                            isActive={isActive}
                        >
                            Button
                        </Button>
                    </Chakra.Box>
                ))}
            </FixtureBox>
        );
    },
};
