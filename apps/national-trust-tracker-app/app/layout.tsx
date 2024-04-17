import type { Metadata } from 'next';

import { Providers } from './providers';
import { Navbar } from '../library/components';

import '../library/prototypes/String.extensions';

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
            style={{ margin: '0', height: '100vh', overflow: ' hidden' }}
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
                    {/* <Navbar /> */}

                    {children}
                </Providers>
            </body>
        </html>
    );
}
