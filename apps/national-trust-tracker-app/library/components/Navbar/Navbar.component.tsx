'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePathname } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';

import { Bar, DrawerSideMenu, MultiSwitch, getCase } from '@sam/library';

import * as Chakra from '@chakra-ui/react';

export const Navbar = ({}) => {
    const { colorMode, toggleColorMode } = Chakra.useColorMode();
    const { space } = Chakra.useTheme();

    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const module = pathname.split('/')[1];
    const subModule = pathname.split('/')[2];

    const {
        register,
        formState: { errors },
    } = useForm<any>({ mode: 'onChange' });

    return (
        <>
            <Bar
                colorScheme={resolveColorScheme()}
                menu={{ onClick: () => setIsOpen(true) }}
                size='lg'
            >
                <Chakra.Flex
                    direction='row'
                    justifyContent='space-between'
                    w='100%'
                >
                    <Chakra.Flex
                        direction='row'
                        gap={space[16]}
                        alignItems='center'
                    >
                        <Chakra.Heading
                            as='h1'
                            fontSize={[16, 16, 20, 24]}
                            display='flex'
                            gap={8}
                        >
                            {module && !subModule && (
                                <Chakra.chakra.span>
                                    {getCase(module, 'sentence')}
                                </Chakra.chakra.span>
                            )}
                            {subModule && (
                                <Chakra.chakra.span>
                                    {getCase(subModule, 'sentence')}
                                </Chakra.chakra.span>
                            )}
                        </Chakra.Heading>
                    </Chakra.Flex>
                    <Chakra.Flex
                        direction='row'
                        gap={[8, 16]}
                    >
                        <MultiSwitch<any>
                            switches={[
                                {
                                    value: 'light',
                                    label: Chakra.useBreakpointValue({
                                        base: undefined,
                                        lg: 'Light',
                                    }),
                                    icon: Chakra.useBreakpointValue({
                                        base: {
                                            icon: 'sun',
                                            ariaLabel: 'light',
                                            boxSize: '100%',
                                        },
                                        lg: undefined,
                                    }),
                                    switchConfig: {
                                        h: [32],
                                    },
                                },
                                {
                                    value: 'dark',
                                    label: Chakra.useBreakpointValue({
                                        base: undefined,
                                        lg: 'Dark',
                                    }),
                                    icon: Chakra.useBreakpointValue({
                                        base: {
                                            icon: 'moon',
                                            ariaLabel: 'dark',
                                        },
                                        lg: undefined,
                                    }),
                                    switchConfig: {
                                        h: [32],
                                    },
                                },
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
                </Chakra.Flex>
            </Bar>
            <DrawerSideMenu
                colorScheme={resolveColorScheme()}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                location={{ pathname }}
                menuItems={[
                    {
                        label: 'Membership',
                        as: Link,
                        slug: '/Membership',
                        icon: {
                            icon: 'membership',
                            ariaLabel: 'membership card',
                        },
                        isActive: module === 'Membership',
                    },
                    {
                        label: 'Visits',
                        as: Link,
                        slug: '/Visits',
                        icon: {
                            icon: 'car',
                            variant: 'solid',
                            ariaLabel: 'car',
                        },
                        isActive: module === 'Visits',
                    },
                    {
                        label: 'Places',
                        as: Link,
                        slug: '/Places',
                        icon: { icon: 'location', ariaLabel: 'location' },
                        isActive: module === 'Places',
                    },
                    {
                        label: 'Stats',
                        as: Link,
                        slug: '/Stats',
                        icon: { icon: 'stats', ariaLabel: 'chart' },
                        isActive: module === 'Stats',
                    },
                ]}
            />
        </>
    );
};

const resolveColorScheme = (component?: string): string => {
    if (process.env['REACT_APP_ENVIRONMENT'] === 'dev') {
        switch (component) {
            default:
                return 'blue';
        }
    }

    if (process.env['REACT_APP_ENVIRONMENT'] === 'staging') {
        switch (component) {
            default:
                return 'teal';
        }
    }

    switch (component) {
        default:
            return 'gray';
    }
};
