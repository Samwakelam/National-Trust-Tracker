'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { Bar, DrawerSideMenu, MultiSwitch, mediaQueries } from '@sam/library';

import * as Chakra from '@chakra-ui/react';

export const Navbar = ({}) => {
    const { colorMode, toggleColorMode } = Chakra.useColorMode();
    const { space } = Chakra.useTheme();

    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const module = pathname.split('/')[1] || 'Home';
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
                            {subModule && (
                                <Chakra.chakra.span>
                                    {subModule}
                                </Chakra.chakra.span>
                            )}
                            <Chakra.chakra.span>{module}</Chakra.chakra.span>
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
                        label: 'Dashboard',
                        as: NextLink,
                        slug: 'Dashboard',
                        icon: { icon: 'dashboard', ariaLabel: 'dashboard' },
                        isActive: module === 'Dashboard',
                    },
                    {
                        label: 'VesselTools',
                        as: NextLink,
                        slug: 'VesselTools',
                        icon: { icon: 'toolbox', ariaLabel: 'toolbox' },
                        isActive: module === 'VesselTools',
                    },
                    {
                        label: 'Clients',
                        as: NextLink,
                        slug: 'Clients',
                        icon: {
                            icon: 'users',
                            ariaLabel: 'clients',
                        },
                        isActive: module === 'Clients',
                    },
                    {
                        label: 'Ports',
                        as: NextLink,
                        slug: 'Ports',
                        icon: { icon: 'boat', ariaLabel: 'boat' },
                        isActive: module === 'Ports',
                    },
                    {
                        label: 'Layers',
                        as: NextLink,
                        slug: 'Layers',
                        icon: { icon: 'lasso-poly', ariaLabel: 'layers' },
                        isActive: module === 'Layers',
                    },
                    {
                        label: 'Events',
                        as: NextLink,
                        slug: 'Events',
                        icon: { icon: 'pirate', ariaLabel: 'jolly roger' },
                        isActive: module === 'Events',
                    },
                ]}
                subMenuItems={[
                    {
                        label: 'Profile',
                        as: NextLink,
                        slug: 'Profile',
                        icon: { icon: 'user', ariaLabel: 'user' },
                        isActive: module === 'Profile',
                    },
                    {
                        label: 'System Admin',
                        as: NextLink,
                        slug: 'Admin',
                        icon: { icon: 'settings', ariaLabel: 'settings' },
                        isActive: module === 'Admin',
                    },
                    {
                        label: 'logout',
                        as: NextLink,
                        icon: { icon: 'logout', ariaLabel: 'logout' },
                        slug: '/.auth/logout',
                    },
                ]}
            />
        </>
    );
};

export const resolveColorScheme = (component?: string): string => {
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
