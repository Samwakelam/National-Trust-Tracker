import type { Metadata } from 'next';

import '@library/tailwind/library/global.css';

import { scrollbar } from '@library/tailwind/library/utilities/className.utils';
import { twMerge } from '@library/tailwind/library/utilities/twMerge.util';

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
                <main
                    className={twMerge(
                        'flex flex-col w-full h-full overflow-y-auto bg-slate-100',
                        scrollbar
                    )}
                >
                    {children}
                </main>
            </body>
        </html>
    );
}
