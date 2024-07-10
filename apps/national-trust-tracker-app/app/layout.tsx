import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dotenv from 'dotenv';

import { scrollbar } from '../library/utilities/className.utils';
import { twMerge } from '../library/utilities/twMerge.util';

import { Navbar } from './partials/Navbar.component';
import { Providers } from './providers';

import '../library/prototypes/String.extensions';
import '../library/global.css';

dotenv.config();

export const metadata: Metadata = {
    title: 'National Trust Tracker App',
    description: "Sam and Dave's Life Membership",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            style={{ margin: '0', height: '100%', overflow: ' hidden' }}
        >
            <body
                style={{
                    margin: '0',
                    height: '100%',
                    overflow: ' hidden',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Providers>
                    <SpeedInsights />
                    <Navbar
                        menuItems={[
                            {
                                label: 'Membership',
                                slug: '/Membership',
                                icon: {
                                    icon: 'membership',
                                    ariaLabel: 'membership card',
                                },
                            },
                            {
                                label: 'Visits',
                                slug: '/Visits',
                                icon: {
                                    icon: 'car',
                                    variant: 'solid',
                                    ariaLabel: 'car',
                                },
                            },
                            {
                                label: 'Places',
                                slug: '/Places',
                                icon: {
                                    icon: 'location',
                                    ariaLabel: 'location',
                                },
                            },
                            {
                                label: 'Stats',
                                slug: '/Stats',
                                icon: { icon: 'stats', ariaLabel: 'chart' },
                            },
                        ]}
                    />
                    <main
                        className={twMerge(
                            'flex flex-col w-full h-full overflow-y-auto bg-slate-100',
                            scrollbar
                        )}
                    >
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
