'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Bar,
    BarProps,
    Button,
    Drawer,
    IconProps,
} from '../../library/components';

type MenuItem = {
    label: string;
    slug?: string;
    onClick?: () => void;
    icon?: IconProps;
};

interface NavbarProps extends BarProps {
    menuItems: MenuItem[];
}

export const Navbar = ({ menuItems, colorScheme }: NavbarProps) => {
    const prevPage = useRef<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const pathname = usePathname();
    const page = pathname.split('/')[1];

    useEffect(() => {
        if (page !== prevPage.current) {
            setIsMenuOpen(false);
        }
        prevPage.current === page;
    }, [page]);

    return (
        <>
            <Bar
                colorScheme={colorScheme}
                cta={{ onClick: () => setIsMenuOpen(true) }}
            >
                <h1 className='font-bold text-32'>{page}</h1>
            </Bar>
            <Drawer
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                divergent='closed'
                direction='left'
                size='sm'
                className='z-100'
            >
                {menuItems.map(({ label, slug, icon, onClick }) => {
                    const ButtonComponent = () => (
                        <Button
                            className='flex flex-row h-full w-full py-20 px-32 rounded-4 cursor-pointer align-center justify-start'
                            colorScheme={colorScheme}
                            divergent='soft'
                            icon={icon}
                            onClick={onClick}
                        >
                            {label}
                        </Button>
                    );

                    if (slug)
                        return (
                            <Link
                                key={`menu-item-${label}`}
                                href={slug}
                                className='w-full rounded-4'
                            >
                                <ButtonComponent />
                            </Link>
                        );

                    return <ButtonComponent />;
                })}
            </Drawer>
        </>
    );
};
