import React, { useState } from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

import { Button, FixtureBox, DrawerSideMenu } from '../components';
import { colorScheme } from '../utils/colours.utils';

const DrawerSideMenuFixture = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    const [hasSubMenu] = useValue<boolean>('Has Submenu items', {
        defaultValue: true,
    });

    const [menuHasIcon] = useValue<boolean>('Main Menu Has Icon', {
        defaultValue: false,
    });

    const [subMenuHasIcon] = useValue<boolean>('Submenu Has Icon', {
        defaultValue: false,
    });

    const [icon] = useSelect('Icon', {
        options: ['bin', 'comment', 'location', 'thumbs-u'],
    });

    const [iconVariant] = useSelect('Icon Variant', {
        options: ['solid', 'outline'],
    });

    const [isActive] = useValue<boolean>('Has Active Item', {
        defaultValue: false,
    });

    return (
        <FixtureBox hasPadding>
            <Button onClick={() => setIsOpen(true)}>Open Menu</Button>
            <DrawerSideMenu
                colorScheme={scheme}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                menuItems={[
                    {
                        label: 'Item 1',
                        icon: menuHasIcon
                            ? { icon, ariaLabel: icon, variant: iconVariant }
                            : undefined,
                        isActive: isActive,
                    },
                    {
                        label: 'Item 1',
                        icon: menuHasIcon
                            ? { icon, ariaLabel: icon, variant: iconVariant }
                            : undefined,
                    },
                    {
                        label: 'Item 2',
                        icon: menuHasIcon
                            ? { icon, ariaLabel: icon, variant: iconVariant }
                            : undefined,
                    },
                    {
                        label: 'Item 3',
                        icon: menuHasIcon
                            ? { icon, ariaLabel: icon, variant: iconVariant }
                            : undefined,
                    },
                ]}
                subMenuItems={
                    hasSubMenu
                        ? [
                              {
                                  label: 'Sub-Item 1',
                                  icon: subMenuHasIcon
                                      ? {
                                            icon,
                                            ariaLabel: icon,
                                            variant: iconVariant,
                                        }
                                      : undefined,
                                  isActive: isActive,
                              },
                              {
                                  label: 'Sub-Item 1',
                                  icon: subMenuHasIcon
                                      ? {
                                            icon,
                                            ariaLabel: icon,
                                            variant: iconVariant,
                                        }
                                      : undefined,
                              },
                              {
                                  label: 'Sub-Item 2',
                                  icon: subMenuHasIcon
                                      ? {
                                            icon,
                                            ariaLabel: icon,
                                            variant: iconVariant,
                                        }
                                      : undefined,
                              },
                              {
                                  label: 'Sub-Item 3',
                                  icon: subMenuHasIcon
                                      ? {
                                            icon,
                                            ariaLabel: icon,
                                            variant: iconVariant,
                                        }
                                      : undefined,
                              },
                          ]
                        : undefined
                }
            />
        </FixtureBox>
    );
};

export default DrawerSideMenuFixture;
